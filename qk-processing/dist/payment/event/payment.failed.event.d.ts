import { Payment, User } from "@prisma/client";
export declare class PaymentFailedEvent {
    payment: Payment;
    student: User;
}
