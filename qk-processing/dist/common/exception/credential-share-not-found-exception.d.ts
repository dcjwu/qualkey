import { NotFoundException } from "@nestjs/common";
export declare class CredentialShareNotFoundException extends NotFoundException {
    constructor(uuid: string);
}
