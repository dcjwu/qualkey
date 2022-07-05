import { Credential, User } from "@prisma/client";
export declare class CredentialsWithdrawalRejectedEvent {
    credentials: Credential;
    representatives: User[];
}
