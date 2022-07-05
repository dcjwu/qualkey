import { Job, Queue } from "bull";
import { HederaService } from "../../hedera/hedera.service";
import { UserRepository } from "../../user/user.repository";
import { CredentialsService } from "../credentials.service";
import { CredentialsStatusUpdateService } from "../credentials.status-update.service";
export declare class CredentialsUploadToHederaConsumer {
    private credentialsNotifyQueue;
    private hederaService;
    private credentialsService;
    private userRepository;
    private readonly credentialsStatusUpdateService;
    constructor(credentialsNotifyQueue: Queue, hederaService: HederaService, credentialsService: CredentialsService, userRepository: UserRepository, credentialsStatusUpdateService: CredentialsStatusUpdateService);
    handleUpload(job: Job): Promise<void>;
}
