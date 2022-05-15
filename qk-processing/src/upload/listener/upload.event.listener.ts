import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { UploadStatus, User } from "@prisma/client";
import { Queue } from "bull";

import { AwsS3Service } from "../../aws/aws.s3.service";
import { PrismaService } from "../../prisma/prisma.service";
import { UploadSucceededEvent, UploadFailedEvent, UploadApprovedEvent, UploadRejectedEvent } from "../event";

/**
 * Handles all events regarding Mass-uploads functionality
 */
@Injectable()
export class UploadEventListener {
  constructor(
      @InjectQueue("upload-notify") private uploadNotifyQueue: Queue,
      private eventEmitter: EventEmitter2,
      private awsS3Service: AwsS3Service,
      private prisma: PrismaService,
  ) {
  }

  @OnEvent("upload.failed")
  async handleUploadFailedEvent(event: UploadFailedEvent): Promise<void> {
    Logger.debug(`upload FAILED ${event.filename}`);

    // remove file
    try {
      await this.awsS3Service.remove(event.filename);
      await this.removeUploadFromDB(event.filename.split(".")[0]);
    } catch(err) {
      Logger.error(err, err.stack);
    }
  }

  @OnEvent("upload.succeeded")
  async handleUploadSucceededEvent(event: UploadSucceededEvent): Promise<void> {
    Logger.debug(`upload SUCCEEDED ${event.upload.uuid}`);

    // send notifications to institution representatives
    event.representatives.forEach((user: User) => {
      Logger.debug(`Dispatching ${user.uuid}`);
      this.uploadNotifyQueue.add("pending",{
        representativeUuid: user.uuid,
        representativeEmail: user.email,
      });
    });
  }

  @OnEvent("upload.approved")
  async handleUploadApprovedEvent(event: UploadApprovedEvent): Promise<void> {
    Logger.debug(`upload APPROVED ${event.upload.uuid}`);

    await this.prisma.upload.update({
      data: { status: UploadStatus.APPROVED },
      where: { uuid: event.upload.uuid },
    });
    Logger.debug(`upload status changed to APPROVED ${event.upload.uuid}`);

    // TODO: Notify representatives about approve

    // load file

    // get the extension, check if it is supported

    // parse depending on the extension

    // foreach entry create CredentialsCreateMessage with data from entry

    // dispatch CredentialsCreateMessage to queue https://github.com/bbc/sqs-producer
    // sqs queue url: https://sqs.eu-north-1.amazonaws.com/594068861847/CreateCredentialsQueue.fifo

    // TODO: remove file
    // try {
    //   await this.awsS3Service.remove(event.upload.filename)
    // } catch(err) {
    //   console.error(err)
    // }
  }

  @OnEvent("upload.rejected")
  async handleUploadRejectedEvent(event: UploadRejectedEvent): Promise<void> {
    Logger.debug(`upload REJECTED ${event.upload.uuid}`);

    await this.prisma.upload.update({
      data: { status: UploadStatus.REJECTED },
      where: { uuid: event.upload.uuid },
    });
    Logger.debug(`upload status changed to REJECTED ${event.upload.uuid}`);

    // TODO: Notify representatives about reject

    // remove file
    try {
      await this.awsS3Service.remove(event.upload.filename);
    } catch(err) {
      console.error(err);
    }
  }

  async removeUploadFromDB(uuid: string): Promise<void> {
    this.prisma.upload.delete({ where: { uuid: uuid } });
    Logger.debug(`upload REMOVED ${uuid}`);
  }
}