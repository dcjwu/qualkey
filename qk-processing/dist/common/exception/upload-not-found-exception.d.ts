import { NotFoundException } from "@nestjs/common";
export declare class UploadNotFoundException extends NotFoundException {
    constructor(uuid: string);
}
