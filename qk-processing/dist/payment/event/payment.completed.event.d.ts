import { Payment, User } from "@prisma/client";
export declare class PaymentCompletedEvent {
    payment: Payment;
    student: User;
}
