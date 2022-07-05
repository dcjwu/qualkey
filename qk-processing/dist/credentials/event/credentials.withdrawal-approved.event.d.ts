import { Credential, User } from "@prisma/client";
export declare class CredentialsWithdrawalApprovedEvent {
    credentials: Credential;
    representatives: User[];
}
