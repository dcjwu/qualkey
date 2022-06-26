import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { User, UserStatus } from "@prisma/client";
import { Queue } from "bull";

import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "../../user/user.repository";
import { CredentialsStatusUpdateService } from "../credentials.status-update.service";
import {
  CredentialsActivatedEvent, CredentialsChangedEvent,
  CredentialsWithdrawalApprovedEvent,
  CredentialsWithdrawalRejectedEvent,
} from "../event";
import { CredentialsRepository } from "../repository/credentials.repository";

/**
 * Handles all events regarding Credentials functionality
 */
@Injectable()
export class CredentialsEventListener {
  constructor(
        @InjectQueue("credentials-notify") private credentialsNotifyQueue: Queue,
        private readonly userRepository: UserRepository,
        private readonly credentialsRepository: CredentialsRepository,
        private readonly prisma: PrismaService,
        private readonly credentialsStatusUpdateService: CredentialsStatusUpdateService,
  ) {
  }

    @OnEvent("credentials.withdrawal.approved")
  async handleCredentialsWithdrawalApprovedEvent(event: CredentialsWithdrawalApprovedEvent): Promise<void> {
    Logger.debug(`credentials withdrawal APPROVED ${event.credentials.uuid}`);

    await this.credentialsStatusUpdateService.toWithdrawn(event.credentials);
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
    // Notify student
    const student = await this.userRepository.getByUuid(event.credentials.studentUuid);
    await this.credentialsNotifyQueue.add("credentials-withdrawn-student", { recipientEmail: student.email });
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

    @OnEvent("credentials.activated")
    async handleCredentialsActivatedEvent(event: CredentialsActivatedEvent): Promise<void> {
      Logger.debug(`credentials ACTIVATED ${event.credentials.uuid}`);
      // Notify student about credentials activation
      await this.credentialsNotifyQueue.add("credentials-activated", { studentEmail: event.student.email });
    }

    @OnEvent("credentials.changed")
    async handleCredentialsChangedEvent(event: CredentialsChangedEvent): Promise<void> {
      Logger.debug(`credentials CHANGED ${event.credentials.uuid}`);

      const student = await this.userRepository.getByUuid(event.credentials.studentUuid);

      // Notify student about credentials change
      await this.credentialsNotifyQueue.add("credentials-changed-student", { recipientEmail: student.email });

      const institution = await this.prisma.institution.findUnique({
        where: { uuid: event.credentials.institutionUuid },
        include: { representatives: true },
      });
      if (! institution) throw new NotFoundException("institution not found");

      const representatives = institution.representatives.filter(r => (r.status === UserStatus.ACTIVE));

      // Notify all representatives
      for (const representative of representatives) {
        await this.credentialsNotifyQueue.add("credentials-changed-representative", { recipientEmail: representative.email });
      }
    }
}