import { EventEmitter2 } from "@nestjs/event-emitter";
import { Credential, CredentialsWithdrawalRequest, User } from "@prisma/client";
import { Queue } from "bull";
import { Decision } from "../action/enum/decision.enum";
import { PrismaService } from "../prisma/prisma.service";
import { CredentialsWithdrawalRequestFactory } from "./factory/credentials-withdrawal-request.factory";
import { CredentialsRepository } from "./repository/credentials.repository";
import { CredentialsWithdrawalRequestRepository } from "./repository/credentials.withdrawal-request.repository";
export declare class CredentialsService {
    private credentialsNotifyQueue;
    private readonly prisma;
    private readonly credentialsRepository;
    private readonly credentialsWithdrawalRequestRepository;
    private readonly credentialsWithdrawalRequestFactory;
    private readonly eventEmitter;
    constructor(credentialsNotifyQueue: Queue, prisma: PrismaService, credentialsRepository: CredentialsRepository, credentialsWithdrawalRequestRepository: CredentialsWithdrawalRequestRepository, credentialsWithdrawalRequestFactory: CredentialsWithdrawalRequestFactory, eventEmitter: EventEmitter2);
    createCredentialsWithdrawalRequest(uuid: string, initiatedBy: User): Promise<CredentialsWithdrawalRequest>;
    processCredentialsWithdrawalDecision(uuid: string, decisionMadeBy: User, actionId: number, decision: Decision): Promise<void>;
    private approveWithdrawal;
    private rejectWithdrawal;
    getCheckedCredentialsWithdrawalRequest(uuid: string, actionMadeBy: User): Promise<CredentialsWithdrawalRequest>;
    deleteCredentials(credentials: Credential): Promise<void>;
}
