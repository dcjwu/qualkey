import { EventEmitter2 } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { AwsS3Service } from "../../aws/aws.s3.service";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "../../user/user.repository";
import { UploadSucceededEvent, UploadFailedEvent, UploadApprovedEvent, UploadRejectedEvent } from "../event";
import { FileParser } from "../parser/file-parser";
export declare class UploadEventListener {
    private uploadNotifyQueue;
    private credentialsCreateQueue;
    private eventEmitter;
    private awsS3Service;
    private prisma;
    private fileParser;
    private userRepository;
    constructor(uploadNotifyQueue: Queue, credentialsCreateQueue: Queue, eventEmitter: EventEmitter2, awsS3Service: AwsS3Service, prisma: PrismaService, fileParser: FileParser, userRepository: UserRepository);
    handleUploadFailedEvent(event: UploadFailedEvent): Promise<void>;
    handleUploadSucceededEvent(event: UploadSucceededEvent): Promise<void>;
    handleUploadApprovedEvent(event: UploadApprovedEvent): Promise<void>;
    handleUploadRejectedEvent(event: UploadRejectedEvent): Promise<void>;
    private removeUploadFromDB;
}
