import { Queue } from "bull";
import { HederaService } from "../hedera/hedera.service";
import { PrismaService } from "../prisma/prisma.service";
import { CredentialsStatusUpdateService } from "./credentials.status-update.service";
import { CredentialsRepository } from "./repository/credentials.repository";
export declare class CredentialsUploadToHederaWatcher {
    private credentialsUploadQueue;
    private readonly prisma;
    private readonly hedera;
    private readonly credentialsRepository;
    private readonly credentialsStatusUpdateService;
    constructor(credentialsUploadQueue: Queue, prisma: PrismaService, hedera: HederaService, credentialsRepository: CredentialsRepository, credentialsStatusUpdateService: CredentialsStatusUpdateService);
    uploadCredentialsToSmartContract(): Promise<void>;
}
