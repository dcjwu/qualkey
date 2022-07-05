import { Job, Queue } from "bull";
import { HederaService } from "../../hedera/hedera.service";
import { UserFactory } from "../../user/user.factory";
import { UserRepository } from "../../user/user.repository";
import { CredentialsService } from "../credentials.service";
import { CredentialsChangeFactory } from "../factory/credentials-change.factory";
import { CredentialsFactory } from "../factory/credentials.factory";
import { CredentialsChangeRepository } from "../repository/credentials-change.repository";
export declare class CredentialsCreateConsumer {
    private credentialsNotifyQueue;
    private readonly hederaService;
    private readonly credentialsService;
    private readonly userFactory;
    private readonly userRepository;
    private readonly credentialsFactory;
    private readonly credentialsChangeFactory;
    private readonly credentialsChangeRepository;
    constructor(credentialsNotifyQueue: Queue, hederaService: HederaService, credentialsService: CredentialsService, userFactory: UserFactory, userRepository: UserRepository, credentialsFactory: CredentialsFactory, credentialsChangeFactory: CredentialsChangeFactory, credentialsChangeRepository: CredentialsChangeRepository);
    handleCreate(job: Job): Promise<void>;
    onActive(job: Job): void;
}
