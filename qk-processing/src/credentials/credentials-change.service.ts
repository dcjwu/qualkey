import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { Decision } from "../action/enum/decision.enum";

@Injectable()
export class CredentialsChangeService {
  /**
     * Process user decision regarding the credentials change request
     */
  public async processCredentialsChangeRequestDecision(
    uuid: string,
    decisionMadeBy: User,
    actionId: number,
    decision: Decision,
  ): Promise<void> {
    const isApproved = decision === Decision.APPROVE;

    if (isApproved) {
      await this.approveChangeRequest(uuid, decisionMadeBy, actionId);
    } else {
      await this.rejectChangeRequest(uuid, decisionMadeBy);
    }
  }

  /**
     * Process approval for the the credentials change request
     */
  private async approveChangeRequest(uuid: string, approvedBy: User, actionId: number): Promise<void> {}

  /**
     * Process reject for the the credentials change request
     */
  private async rejectChangeRequest(uuid: string, rejectedBy: User): Promise<void> {}
}