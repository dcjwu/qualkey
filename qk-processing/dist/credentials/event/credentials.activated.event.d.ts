import { Credential, User } from "@prisma/client";
export declare class CredentialsActivatedEvent {
    credentials: Credential;
    student: User;
}
