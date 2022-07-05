/// <reference types="node" />
import { PaymentStripeEventProcessor } from "./payment-stripe-event-processor.service";
import { PaymentService } from "./payment.service";
export declare class PaymentWebhookController {
    private paymentService;
    private eventProcessor;
    constructor(paymentService: PaymentService, eventProcessor: PaymentStripeEventProcessor);
    handleIncomingWebhooks(signature: string, raw: Buffer): Promise<void>;
}
