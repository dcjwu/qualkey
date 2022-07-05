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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const aws_s3_service_1 = require("../aws/aws.s3.service");
const prisma_service_1 = require("../prisma/prisma.service");
const dto_1 = require("./dto");
const event_1 = require("./event");
const upload_service_1 = require("./upload.service");
let UploadController = class UploadController {
    constructor(uploadService, awsS3Service, eventEmitter, prisma) {
        this.uploadService = uploadService;
        this.awsS3Service = awsS3Service;
        this.eventEmitter = eventEmitter;
        this.prisma = prisma;
    }
    async getMe(user, uuid) {
        const upload = await this.prisma.upload.findUnique({ where: { uuid: uuid } });
        const uploadApprovedEvent = new event_1.UploadApprovedEvent();
        uploadApprovedEvent.upload = upload;
        uploadApprovedEvent.representatives = [];
        uploadApprovedEvent.approvedBy = user;
        this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
    }
    async massUpload(user, file, dto) {
        if (user.role !== client_1.Role.INSTITUTION_REPRESENTATIVE)
            throw new common_1.ForbiddenException();
        const filename = await this.awsS3Service.upload(file);
        await this.uploadService.processUpload(filename, file.originalname, dto.mapping, user);
    }
    async getUploadFile(user, dto) {
        if (user.role !== client_1.Role.INSTITUTION_REPRESENTATIVE)
            throw new common_1.ForbiddenException();
        const upload = await this.uploadService.getCheckedUpload(dto.uuid, user);
        const type = upload.originalFilename.split(".").pop();
        return new common_1.StreamableFile(this.awsS3Service.get(upload.filename), {
            type: `application/${type}`,
            disposition: `attachment; filename="${upload.uuid}.${type}"`,
        });
    }
};
__decorate([
    (0, common_1.Get)("test"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, dto_1.UploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "massUpload", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UploadGetFileDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getUploadFile", null);
UploadController = __decorate([
    (0, common_1.Controller)("upload"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(1, (0, common_1.Inject)(aws_s3_service_1.AwsS3Service)),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        aws_s3_service_1.AwsS3Service,
        event_emitter_1.EventEmitter2,
        prisma_service_1.PrismaService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map