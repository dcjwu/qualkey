import { NotFoundException } from "@nestjs/common";
export declare class PaymentNotFoundException extends NotFoundException {
    constructor(uuid: string);
}
