import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

import { AwsSesService } from "../../aws/aws.ses.service";

@Processor("payment-notify")
export class PaymentNotifyConsumer {
  constructor(private ses: AwsSesService) {
  }

    @Process("failed")
  async handleFailed(job: Job): Promise<void> {
    Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
    Logger.debug(`Sending notification to ${job.data.studentEmail}`);
    try {
      await this.ses.sendPaymentFailed(job.data.studentEmail);
    } catch (err) {
      Logger.error(err, err.stack);
      return;
    }
    await job.moveToCompleted();
  }

    @Process("completed")
    async handleCompleted(job: Job): Promise<void> {
      Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
      Logger.debug(`Sending notification to ${job.data.studentEmail}`);
      try {
        await this.ses.sendPaymentCompleted(job.data.studentEmail);
      } catch (err) {
        Logger.error(err, err.stack);
        return;
      }
      await job.moveToCompleted();
    }
}