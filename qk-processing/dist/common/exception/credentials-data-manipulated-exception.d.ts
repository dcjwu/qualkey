import { NotFoundException } from "@nestjs/common";
export declare class CredentialsDataManipulatedException extends NotFoundException {
    constructor(id: string);
}
