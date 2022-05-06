/// <reference types="multer" />
import { User } from "@prisma/client";
import { UploadDto } from "./dto";
import { UploadService } from "./upload.service";
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    massUpload(user: User, file: Express.Multer.File, dto: UploadDto): Promise<void>;
}
