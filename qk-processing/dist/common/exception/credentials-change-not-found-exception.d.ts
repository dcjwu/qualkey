import { NotFoundException } from "@nestjs/common";
export declare class CredentialsChangeNotFoundException extends NotFoundException {
    constructor(id: number);
}
