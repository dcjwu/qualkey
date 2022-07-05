import { NotFoundException } from "@nestjs/common";
export declare class ActionNotFoundException extends NotFoundException {
    constructor(id: number);
}
