import { NotFoundException } from "@nestjs/common";
export declare class CredentialsNotFoundException extends NotFoundException {
    constructor(did: string);
}
