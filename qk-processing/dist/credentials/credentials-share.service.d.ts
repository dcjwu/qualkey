import { CredentialShare, Credential } from "@prisma/client";
import { Queue } from "bull";
import { CredentialsShareRequestDto } from "./dto";
import { CredentialsShareFactory } from "./factory/credentials-share.factory";
export declare class CredentialsShareService {
    private credentialsNotifyQueue;
    private credentialsShareFactory;
    constructor(credentialsNotifyQueue: Queue, credentialsShareFactory: CredentialsShareFactory);
    processCredentialsShare(dto: CredentialsShareRequestDto, credentialsList: Credential[]): Promise<CredentialShare>;
}
