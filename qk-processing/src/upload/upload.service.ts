import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { UploadSucceededEvent, UploadFailedEvent } from "./event";
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
  async processUpload(filename: string, mapping: string, uploadedBy: User): Promise<void> {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: { uuid: uploadedBy.institutionUuid },
        include: { representatives: true },
      });

      const upload = await this.prisma.upload.create({
        data: {
          uuid: filename.split('.')[0],
          filename: filename,
          mapping: mapping,
          uploadedBy: uploadedBy.uuid,
          confirmationsRequestedFrom: institution.representatives.map(r => r.uuid).join(";"),
        },
      });

      const uploadSucceededEvent = new UploadSucceededEvent();
      uploadSucceededEvent.upload = upload;
      uploadSucceededEvent.representatives = institution.representatives;
      this.eventEmitter.emit("upload.succeeded", uploadSucceededEvent);

    } catch (e) {
      console.log(e);

      const uploadFailedEvent = new UploadFailedEvent();
      uploadFailedEvent.filename = filename;
      uploadFailedEvent.uploadedBy = uploadedBy.uuid;
      this.eventEmitter.emit("upload.failed", uploadFailedEvent);

      throw new UploadFailedException(filename, e.message);
    }
  }
}
