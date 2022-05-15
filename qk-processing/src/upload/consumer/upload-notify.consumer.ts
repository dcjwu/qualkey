import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

import { AwsSesService } from "../../aws/aws.ses.service";

@Processor("upload-notify")
export class UploadNotifyConsumer {
  constructor(private ses: AwsSesService) {
  }

    @Process("pending")
  async transcode(job: Job): Promise<void> {
    Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
    Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
    try {
      await this.ses.sendReviewUploadEmail(job.data.representativeEmail);
    } catch (err) {
      Logger.error(err, err.stack);
    }
  }

    @OnQueueActive()
    onActive(job: Job): void {
      Logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
}