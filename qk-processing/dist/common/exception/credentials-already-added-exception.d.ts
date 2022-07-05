import { ConflictException } from "@nestjs/common";
export declare class CredentialsAlreadyAddedException extends ConflictException {
    constructor(id: number, smartContractId: string);
}
