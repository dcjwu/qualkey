import { Credential, User } from "@prisma/client";

export class CredentialsWithdrawalRejectedEvent {
  credentials: Credential;
  representatives: User[];
}