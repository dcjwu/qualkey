import { User } from "@prisma/client";
import { PaymentCheckoutDto } from "./dto";
import { PaymentService } from "./payment.service";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    postCredentialsShare(user: User, dto: PaymentCheckoutDto): Promise<string>;
}
