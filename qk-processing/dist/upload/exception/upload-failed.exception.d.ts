import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";
export declare class UploadFailedException extends RuntimeException {
    constructor(filename: string, reason: string);
}
