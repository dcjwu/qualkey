import { Queue } from "bull";
import { CredentialsStatusUpdateService } from "../../credentials/credentials.status-update.service";
import { PaymentCompletedEvent, PaymentFailedEvent } from "../event";
export declare class PaymentEventListener {
    private paymentNotifyQueue;
    private readonly credentialsStatusUpdateService;
    constructor(paymentNotifyQueue: Queue, credentialsStatusUpdateService: CredentialsStatusUpdateService);
    handlePaymentFailedEvent(event: PaymentFailedEvent): Promise<void>;
    handlePaymentCompletedEvent(event: PaymentCompletedEvent): Promise<void>;
}
