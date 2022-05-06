import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class UploadService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    processUpload(filename: string, mapping: string, uploadedBy: User): Promise<void>;
}
