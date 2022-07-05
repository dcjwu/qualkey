/// <reference types="multer" />
import { StreamableFile } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "@prisma/client";
import { AwsS3Service } from "../aws/aws.s3.service";
import { PrismaService } from "../prisma/prisma.service";
import { UploadDto, UploadGetFileDto } from "./dto";
import { UploadService } from "./upload.service";
export declare class UploadController {
    private uploadService;
    private awsS3Service;
    private eventEmitter;
    private prisma;
    constructor(uploadService: UploadService, awsS3Service: AwsS3Service, eventEmitter: EventEmitter2, prisma: PrismaService);
    getMe(user: User, uuid: string): Promise<void>;
    massUpload(user: User, file: Express.Multer.File, dto: UploadDto): Promise<void>;
    getUploadFile(user: User, dto: UploadGetFileDto): Promise<StreamableFile>;
}
