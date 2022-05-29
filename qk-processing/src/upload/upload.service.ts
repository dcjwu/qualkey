import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Upload, UploadStatus, User, UserActionType } from "@prisma/client";

import { Decision } from "../action/enum/decision.enum";
import { LogicException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import { UploadSucceededEvent, UploadFailedEvent, UploadApprovedEvent, UploadRejectedEvent } from "./event";
import { UploadFailedException } from "./exception";

/**
 * Master class for the work related to mass-upload
 */
@Injectable()
export class UploadService {
  constructor(
      private prisma: PrismaService,
      private eventEmitter: EventEmitter2,
  ) {}

  /**
   * This function gets everything needed for creation of the Upload Value Object
   * It creates and saves the Upload VO as entry in the database if successful
   * Or throws exception in case something went wrong
   */
  async processUpload(filename: string, originalFilename: string, mapping: string, uploadedBy: User): Promise<void> {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: { uuid: uploadedBy.institutionUuid },
        include: { representatives: true },
      });
      if (! institution) throw new NotFoundException("institution not found");

      const representatives = institution.representatives.filter(r => r.uuid !== uploadedBy.uuid);

      const upload = await this.prisma.upload.create({
        data: {
          uuid: filename.split(".")[0],
          filename: filename,
          originalFilename: originalFilename,
          mapping: mapping,
          uploadedBy: uploadedBy.uuid,
          confirmationsRequestedFrom: representatives.map(r => r.uuid).join(";"),
        },
      });

      const uploadSucceededEvent = new UploadSucceededEvent();
      uploadSucceededEvent.upload = upload;
      uploadSucceededEvent.representatives = representatives;
      this.eventEmitter.emit("upload.succeeded", uploadSucceededEvent);

      //  If there is no other representatives - Approve upload right away
      if (0 === representatives.length) {
        const uploadApprovedEvent = new UploadApprovedEvent();
        uploadApprovedEvent.upload = upload;
        uploadApprovedEvent.representatives = [];
        uploadApprovedEvent.approvedBy = uploadedBy;
        this.eventEmitter.emit("upload.approved", uploadApprovedEvent);

        return;
      }

      for (const representative of representatives) {
        await this.prisma.userActions.create({
          data: {
            userUuid: representative.uuid,
            type: UserActionType.REVIEW_UPLOAD,
            subjectUuid: upload.uuid,
          },
        });
      }
    } catch (e) {
      Logger.error(e);

      const uploadFailedEvent = new UploadFailedEvent();
      uploadFailedEvent.filename = filename;
      uploadFailedEvent.uploadedBy = uploadedBy.uuid;
      this.eventEmitter.emit("upload.failed", uploadFailedEvent);

      throw new UploadFailedException(filename, e.message);
    }
  }

  /**
   * Process user decision regarding the mass-upload
   */
  public async processDecisionForUpload(uuid: string, decisionMadeBy: User, actionId: number, decision: Decision): Promise<void> {
    const isApproved = decision === Decision.APPROVE;

    if (isApproved) {
      await this.approveUpload(uuid, decisionMadeBy, actionId);
    } else {
      await this.rejectUpload(uuid, decisionMadeBy);
    }
  }

  /**
   * Process approval of the mass-upload from the institution representative
   */
  private async approveUpload(uuid: string, approvedBy: User, actionId: number): Promise<void> {
    const upload = await this.getCheckedUpload(uuid, approvedBy);
    const requestedFrom = upload.confirmationsRequestedFrom.split(";");

    let confirmedBy = [];
    // Add approve
    if (! upload.confirmedBy) {
      await this.prisma.upload.update({
        data: { confirmedBy: approvedBy.uuid },
        where: { uuid: uuid },
      });
      confirmedBy.push(approvedBy.uuid);
    } else {
      confirmedBy = upload.confirmedBy.split(";");
      if (confirmedBy.includes(approvedBy.uuid)) throw new LogicException("Already approved.");

      confirmedBy.push(approvedBy.uuid);

      await this.prisma.upload.update({
        data: { confirmedBy: confirmedBy.map(uuid => uuid).join(";") },
        where: { uuid: uuid },
      });
    }

    await this.prisma.userActions.delete({ where: { id: actionId } });

    // if all approved emit UploadApprovedEvent
    if (confirmedBy.length === requestedFrom.length) {
      const institution = await this.prisma.institution.findUnique({
        where: { uuid: approvedBy.institutionUuid },
        include: { representatives: true },
      });
      if (! institution) throw new NotFoundException("institution not found");

      const uploadApprovedEvent = new UploadApprovedEvent();
      uploadApprovedEvent.upload = upload;
      uploadApprovedEvent.representatives = institution.representatives;
      uploadApprovedEvent.approvedBy = approvedBy;
      this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
    }
  }

  /**
   * Process rejection of the mass-upload from the institution representative
   */
  private async rejectUpload(uuid: string, rejectedBy: User): Promise<void> {
    const upload = await this.getCheckedUpload(uuid, rejectedBy);

    // Delete all userActions for this upload and delete them
    await this.prisma.userActions.deleteMany({
      where: {
        type: UserActionType.REVIEW_UPLOAD,
        subjectUuid: uuid,
      },
    });

    const institution = await this.prisma.institution.findUnique({
      where: { uuid: rejectedBy.institutionUuid },
      include: { representatives: true },
    });
    if (! institution) throw new NotFoundException("institution not found");

    const uploadRejectedEvent = new UploadRejectedEvent();
    uploadRejectedEvent.upload = upload;
    uploadRejectedEvent.rejectedBy = rejectedBy;
    uploadRejectedEvent.representatives = institution.representatives;
    this.eventEmitter.emit("upload.rejected", uploadRejectedEvent);
  }

  /**
   * Verifies upload exists and is in the correct status
   */
  public async getCheckedUpload(uuid: string, actionMadeBy: User): Promise<Upload> {
    // Get upload from DB
    const upload = await this.prisma.upload.findUnique({ where: { uuid: uuid } });
    if (! upload) throw new NotFoundException("upload not found");

    // check status
    if (upload.status !== UploadStatus.PENDING) throw new LogicException("Wrong upload status.");

    const requestedFrom = upload.confirmationsRequestedFrom.split(";");
    if (! requestedFrom.includes(actionMadeBy.uuid)) throw new ForbiddenException();

    return upload;
  }
}
