import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

import { AwsSesService } from "../../aws/aws.ses.service";

@Processor("credentials-notify")
export class CredentialsNotifyConsumer {
  constructor(private ses: AwsSesService) {
  }

    @Process("withdrawal-approved")
  async handleWithdrawalApproved(job: Job): Promise<void> {
    Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
    Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
    try {
      await this.ses.sendWithdrawalApprovedEmail(job.data.representativeEmail);
    } catch (err) {
      Logger.error(err, err.stack);
      return;
    }
    await job.moveToCompleted();
  }

    @Process("withdrawal-rejected")
    async handleWithdrawalRejected(job: Job): Promise<void> {
      Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
      Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
      try {
        await this.ses.sendWithdrawalRejectedEmail(job.data.representativeEmail);
      } catch (err) {
        Logger.error(err, err.stack);
        return;
      }
      await job.moveToCompleted();
    }

    @Process("withdrawal-request-created")
    async handleWithdrawalRequestCreated(job: Job): Promise<void> {
      Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
      Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
      try {
        await this.ses.sendReviewWithdrawalEmail(job.data.representativeEmail);
      } catch (err) {
        Logger.error(err, err.stack);
        return;
      }
      await job.moveToCompleted();
    }

    @Process("credentials-share")
    async handleCredentialsShare(job: Job): Promise<void> {
      Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
      Logger.debug(`Sending notification to ${job.data.recipientEmail} with temporaryPassword: ${job.data.temporaryPassword}`);
      try {
        await this.ses.sendShareCredentials(job.data.recipientEmail, job.data.temporaryPassword);
      } catch (err) {
        Logger.error(err, err.stack);
        return;
      }
      await job.moveToCompleted();
    }
}