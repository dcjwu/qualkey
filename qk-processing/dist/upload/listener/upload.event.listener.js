"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadEventListener = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const client_1 = require("@prisma/client");
const aws_s3_service_1 = require("../../aws/aws.s3.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_repository_1 = require("../../user/user.repository");
const event_1 = require("../event");
const file_parser_1 = require("../parser/file-parser");
let UploadEventListener = class UploadEventListener {
    constructor(uploadNotifyQueue, credentialsCreateQueue, eventEmitter, awsS3Service, prisma, fileParser, userRepository) {
        this.uploadNotifyQueue = uploadNotifyQueue;
        this.credentialsCreateQueue = credentialsCreateQueue;
        this.eventEmitter = eventEmitter;
        this.awsS3Service = awsS3Service;
        this.prisma = prisma;
        this.fileParser = fileParser;
        this.userRepository = userRepository;
    }
    async handleUploadFailedEvent(event) {
        common_1.Logger.debug(`upload FAILED ${event.filename}`);
        try {
            await this.awsS3Service.remove(event.filename);
            await this.removeUploadFromDB(event.filename.split(".")[0]);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
        }
    }
    async handleUploadSucceededEvent(event) {
        common_1.Logger.debug(`upload SUCCEEDED ${event.upload.uuid}`);
        event.representatives.forEach((user) => {
            common_1.Logger.debug(`Dispatching ${user.uuid}`);
            this.uploadNotifyQueue.add("pending", {
                representativeUuid: user.uuid,
                representativeEmail: user.email,
            });
        });
    }
    async handleUploadApprovedEvent(event) {
        common_1.Logger.debug(`upload APPROVED ${event.upload.uuid}`);
        await this.prisma.upload.update({
            data: { status: client_1.UploadStatus.APPROVED },
            where: { uuid: event.upload.uuid },
        });
        common_1.Logger.debug(`upload status changed to APPROVED ${event.upload.uuid}`);
        if (0 !== event.representatives.length) {
            event.representatives.forEach((user) => {
                common_1.Logger.debug(`Dispatching ${user.uuid}`);
                this.uploadNotifyQueue.add("approved", {
                    representativeUuid: user.uuid,
                    representativeEmail: user.email,
                });
            });
        }
        const authenticatedBy = await this.userRepository.getByUuid(event.upload.uploadedBy);
        const credentialDataArray = await this.fileParser
            .parseUpload(this.awsS3Service.get(event.upload.filename), authenticatedBy, event.upload.mapping.split(","), event.upload.filename);
        common_1.Logger.debug(`Upload parsed into DTOs ${event.upload.uuid}`);
        credentialDataArray.forEach(credentialData => {
            common_1.Logger.debug(`Dispatching credentialsCreateMessage ${credentialData.graduatedName}`);
            this.credentialsCreateQueue.add("create", { credentialDataDto: credentialData, uploadUuid: event.upload.uuid });
        });
    }
    async handleUploadRejectedEvent(event) {
        common_1.Logger.debug(`upload REJECTED ${event.upload.uuid}`);
        await this.prisma.upload.update({
            data: { status: client_1.UploadStatus.REJECTED },
            where: { uuid: event.upload.uuid },
        });
        common_1.Logger.debug(`upload status changed to REJECTED ${event.upload.uuid}`);
        event.representatives.forEach((user) => {
            common_1.Logger.debug(`Dispatching ${user.uuid}`);
            this.uploadNotifyQueue.add("rejected", {
                representativeUuid: user.uuid,
                representativeEmail: user.email,
            });
        });
        try {
            await this.awsS3Service.remove(event.upload.filename);
        }
        catch (err) {
            console.error(err);
        }
    }
    async removeUploadFromDB(uuid) {
        this.prisma.upload.delete({ where: { uuid: uuid } });
        common_1.Logger.debug(`upload REMOVED ${uuid}`);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)("upload.failed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.UploadFailedEvent]),
    __metadata("design:returntype", Promise)
], UploadEventListener.prototype, "handleUploadFailedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("upload.succeeded"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.UploadSucceededEvent]),
    __metadata("design:returntype", Promise)
], UploadEventListener.prototype, "handleUploadSucceededEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("upload.approved"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.UploadApprovedEvent]),
    __metadata("design:returntype", Promise)
], UploadEventListener.prototype, "handleUploadApprovedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("upload.rejected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.UploadRejectedEvent]),
    __metadata("design:returntype", Promise)
], UploadEventListener.prototype, "handleUploadRejectedEvent", null);
UploadEventListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("upload-notify")),
    __param(1, (0, bull_1.InjectQueue)("credentials-create")),
    __metadata("design:paramtypes", [Object, Object, event_emitter_1.EventEmitter2,
        aws_s3_service_1.AwsS3Service,
        prisma_service_1.PrismaService,
        file_parser_1.FileParser,
        user_repository_1.UserRepository])
], UploadEventListener);
exports.UploadEventListener = UploadEventListener;
//# sourceMappingURL=upload.event.listener.js.map