import { EventEmitter2 } from "@nestjs/event-emitter";
import { Credential } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class CredentialsStatusUpdateService {
    private readonly prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    toActivated(uuid: string): Promise<void>;
    toUploadingToBlockchain(credentials: Credential): Promise<Credential>;
    toFailedUploadingToBlockchain(credentials: Credential): Promise<Credential>;
    toUploadedToBlockchain(credentials: Credential): Promise<Credential>;
    toWithdrawn(credentials: Credential): Promise<Credential>;
}
