import { ConflictException } from "@nestjs/common";
export declare class CredentialsChangeRequestAlreadyCreatedException extends ConflictException {
    constructor(uuid: string);
}
