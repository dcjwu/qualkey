import { NotFoundException } from "@nestjs/common";
export declare class InstitutionNotFoundException extends NotFoundException {
    constructor(uuid: string);
}
