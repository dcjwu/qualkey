import { EventEmitter2 } from "@nestjs/event-emitter";
import { Upload, User } from "@prisma/client";
import { Decision } from "../action/enum/decision.enum";
import { PrismaService } from "../prisma/prisma.service";
export declare class UploadService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    processUpload(filename: string, originalFilename: string, mapping: string, uploadedBy: User): Promise<void>;
    processDecisionForUpload(uuid: string, decisionMadeBy: User, actionId: number, decision: Decision): Promise<void>;
    private approveUpload;
    private rejectUpload;
    getCheckedUpload(uuid: string, actionMadeBy: User): Promise<Upload>;
}
