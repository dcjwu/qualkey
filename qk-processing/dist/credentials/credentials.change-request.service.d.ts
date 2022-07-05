import { Credential, CredentialChangeRequest, User } from "@prisma/client";
import { Queue } from "bull";
import { Decision } from "../action/enum/decision.enum";
import { PrismaService } from "../prisma/prisma.service";
import { UserRepository } from "../user/user.repository";
import { CredentialsChangeService } from "./credentials-change.service";
import { CredentialsRequestChangeDto } from "./dto/credentials.request-change.dto";
import { CredentialsChangeRequestRepository } from "./repository/credentials.change-request.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
export declare class CredentialsChangeRequestService {
    private credentialsNotifyQueue;
    private readonly credentialsRepository;
    private readonly credentialsChangeRequestRepository;
    private readonly prisma;
    private readonly userRepository;
    private readonly credentialsChangeService;
    constructor(credentialsNotifyQueue: Queue, credentialsRepository: CredentialsRepository, credentialsChangeRequestRepository: CredentialsChangeRequestRepository, prisma: PrismaService, userRepository: UserRepository, credentialsChangeService: CredentialsChangeService);
    createChangeRequest(credentials: Credential, dto: CredentialsRequestChangeDto): Promise<CredentialChangeRequest>;
    processCredentialsChangeRequestDecision(uuid: string, decisionMadeBy: User, decision: Decision): Promise<void>;
    private approveChangeRequest;
    private rejectChangeRequest;
    getCheckedCredentialChangeRequest(uuid: string, actionMadeBy: User): Promise<CredentialChangeRequest>;
    private updateStatus;
}
