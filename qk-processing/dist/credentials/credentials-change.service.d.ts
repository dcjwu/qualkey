import { EventEmitter2 } from "@nestjs/event-emitter";
import { Credential, CredentialChange, User } from "@prisma/client";
import { Queue } from "bull";
import { HederaService } from "../hedera/hedera.service";
import { PrismaService } from "../prisma/prisma.service";
import { CredentialsChangeFactory } from "./factory/credentials-change.factory";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
export declare class CredentialsChangeService {
    private credentialsNotifyQueue;
    private readonly credentialsChangeRepository;
    private readonly credentialsChangeFactory;
    private readonly hederaService;
    private readonly prisma;
    private readonly eventEmitter;
    constructor(credentialsNotifyQueue: Queue, credentialsChangeRepository: CredentialsChangeRepository, credentialsChangeFactory: CredentialsChangeFactory, hederaService: HederaService, prisma: PrismaService, eventEmitter: EventEmitter2);
    processCredentialChange(changedBy: User, credentials: Credential, changedTo: string[], fieldName: string[]): Promise<CredentialChange>;
}
