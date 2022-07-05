import { Queue } from "bull";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "../../user/user.repository";
import { CredentialsStatusUpdateService } from "../credentials.status-update.service";
import { CredentialsActivatedEvent, CredentialsChangedEvent, CredentialsWithdrawalApprovedEvent, CredentialsWithdrawalRejectedEvent } from "../event";
import { CredentialsRepository } from "../repository/credentials.repository";
export declare class CredentialsEventListener {
    private credentialsNotifyQueue;
    private readonly userRepository;
    private readonly credentialsRepository;
    private readonly prisma;
    private readonly credentialsStatusUpdateService;
    constructor(credentialsNotifyQueue: Queue, userRepository: UserRepository, credentialsRepository: CredentialsRepository, prisma: PrismaService, credentialsStatusUpdateService: CredentialsStatusUpdateService);
    handleCredentialsWithdrawalApprovedEvent(event: CredentialsWithdrawalApprovedEvent): Promise<void>;
    handleCredentialsWithdrawalRejectedEvent(event: CredentialsWithdrawalRejectedEvent): Promise<void>;
    handleCredentialsActivatedEvent(event: CredentialsActivatedEvent): Promise<void>;
    handleCredentialsChangedEvent(event: CredentialsChangedEvent): Promise<void>;
}
