import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../prisma/prisma.service";
export declare class PaymentStatusUpdateService {
    private readonly prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    toFailed(uuid: string): Promise<void>;
    toCompleted(uuid: string): Promise<void>;
    private checkPaymentStatus;
}
