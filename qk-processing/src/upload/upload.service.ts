import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { UploadSucceededEvent, UploadFailedEvent } from "./event";
import { UploadFailedException } from "./exception";

@Injectable()
export class UploadService {
  constructor(
      private prisma: PrismaService,
      private eventEmitter: EventEmitter2,
  ) {}

  async processUpload(filename: string, mapping: string, uploadedBy: User): Promise<void> {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: { uuid: uploadedBy.institutionUuid },
        include: { representatives: true },
      });

      await this.prisma.upload.create({
        data: {
          file_url: filename,
          mapping: mapping,
          uploadedBy: uploadedBy.uuid,
          confirmationsRequestedFrom: institution.representatives.map(r => r.uuid).join(";"),
        },
      });

      const uploadSucceededEvent = new UploadSucceededEvent();
      uploadSucceededEvent.filename = filename;
      uploadSucceededEvent.uploadedBy = uploadedBy.uuid;
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
