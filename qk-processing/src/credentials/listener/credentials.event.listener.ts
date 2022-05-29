import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { User } from "@prisma/client";
import { Queue } from "bull";

import { PrismaService } from "../../prisma/prisma.service";
import { CredentialsService } from "../credentials.service";
import { CredentialsWithdrawalApprovedEvent, CredentialsWithdrawalRejectedEvent } from "../event";

/**
 * Handles all events regarding Credentials functionality
 */
@Injectable()
export class CredentialsEventListener {
  constructor(
        @InjectQueue("credentials-notify") private credentialsNotifyQueue: Queue,
        private credentialsService: CredentialsService,
        private prisma: PrismaService,
  ) {
  }

    @OnEvent("credentials.withdrawal.approved")
  async handleCredentialsWithdrawalApprovedEvent(event: CredentialsWithdrawalApprovedEvent): Promise<void> {
    Logger.debug(`credentials withdrawal APPROVED ${event.credentials.uuid}`);

    await this.credentialsService.toWithdrawn(event.credentials);
    Logger.debug(`credentials status changed to WITHDRAWN ${event.credentials.uuid}`);

    if (0 !== event.representatives.length) {
      // Notify representatives about withdrawal
      event.representatives.forEach((user: User) => {
        Logger.debug(`Dispatching ${user.uuid}`);
        this.credentialsNotifyQueue.add("withdrawal-approved", {
          representativeUuid: user.uuid,
          representativeEmail: user.email,
        });
      });
    }
    // Remove Withdrawal Request
    await this.prisma.credentialsWithdrawalRequest.delete({ where: { credentialsUuid: event.credentials.uuid } });
    Logger.debug(`WithdrawalRequest for credentials ${event.credentials.uuid} was removed`);
    // TODO: Notify student?
  }

    @OnEvent("credentials.withdrawal.rejected")
    async handleCredentialsWithdrawalRejectedEvent(event: CredentialsWithdrawalRejectedEvent): Promise<void> {
      Logger.debug(`credentials withdrawal REJECTED ${event.credentials.uuid}`);

      if (0 !== event.representatives.length) {
        // Notify representatives about withdrawal rejected
        event.representatives.forEach((user: User) => {
          Logger.debug(`Dispatching ${user.uuid}`);
          this.credentialsNotifyQueue.add("withdrawal-rejected", {
            representativeUuid: user.uuid,
            representativeEmail: user.email,
          });
        });
      }

      // Remove Withdrawal Request
      await this.prisma.credentialsWithdrawalRequest.delete({ where: { credentialsUuid: event.credentials.uuid } });
      Logger.debug(`WithdrawalRequest for credentials ${event.credentials.uuid} was removed`);
    }
}