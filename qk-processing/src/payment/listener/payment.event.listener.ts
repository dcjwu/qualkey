import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";

import { CredentialsStatusUpdateService } from "../../credentials/credentials.status-update.service";
import { PaymentCompletedEvent, PaymentFailedEvent } from "../event";

/**
 * Handler for all events regarding payments
 */
@Injectable()
export class PaymentEventListener {
  constructor(
        @InjectQueue("payment-notify") private paymentNotifyQueue: Queue,
        private readonly credentialsStatusUpdateService: CredentialsStatusUpdateService,
  ) {
  }

    @OnEvent("payment.failed")
  async handlePaymentFailedEvent(event: PaymentFailedEvent): Promise<void> {
    Logger.debug(`payment FAILED ${event.payment.uuid}`);

    // send notification that payment has failed
    await this.paymentNotifyQueue.add("failed",{
      studentEmail: event.student.email,
      credentialUuids: event.payment.credentialUuids,
    });
  }

    @OnEvent("payment.completed")
    async handlePaymentCompletedEvent(event: PaymentCompletedEvent): Promise<void> {
      Logger.debug(`payment COMPLETED ${event.payment.uuid}`);

      // send notification that payment has completed
      await this.paymentNotifyQueue.add("completed",{
        studentEmail: event.student.email,
        credentialUuids: event.payment.credentialUuids,
      });

      // Change credentials Status to activated
      for (const credentialsUuid of event.payment.credentialUuids) {
        await this.credentialsStatusUpdateService.toActivated(credentialsUuid);
      }
    }
}