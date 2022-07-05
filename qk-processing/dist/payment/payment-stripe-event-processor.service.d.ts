import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentStatusUpdateService } from "./payment.status-update.service";
export declare class PaymentStripeEventProcessor {
    private readonly prisma;
    private readonly paymentStatusUpdateService;
    constructor(prisma: PrismaService, paymentStatusUpdateService: PaymentStatusUpdateService);
    processEvent(event: Stripe.Event): Promise<void>;
}
