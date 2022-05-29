import { Credential, User } from "@prisma/client";

export class CredentialsWithdrawalApprovedEvent {
  credentials: Credential;
  representatives: User[];
}