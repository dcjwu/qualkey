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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../prisma/prisma.service");
const event_1 = require("./event");
const exception_1 = require("./exception");
let UploadService = class UploadService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async processUpload(filename, mapping, uploadedBy) {
        try {
            const institution = await this.prisma.institution.findUnique({
                where: { uuid: uploadedBy.institutionUuid },
                include: { representatives: true },
            });
            await this.prisma.upload.create({
                data: {
                    file_url: filename,
                    mapping: mapping,
                    uploadedBy: uploadedBy.uuid,
                    confirmationsRequestedFrom: institution.representatives.map(r => r.uuid).join(";"),
                },
            });
            const uploadSucceededEvent = new event_1.UploadSucceededEvent();
            uploadSucceededEvent.filename = filename;
            uploadSucceededEvent.uploadedBy = uploadedBy.uuid;
            uploadSucceededEvent.representatives = institution.representatives;
            this.eventEmitter.emit("upload.succeeded", uploadSucceededEvent);
        }
        catch (e) {
            console.log(e);
            const uploadFailedEvent = new event_1.UploadFailedEvent();
            uploadFailedEvent.filename = filename;
            uploadFailedEvent.uploadedBy = uploadedBy.uuid;
            this.eventEmitter.emit("upload.failed", uploadFailedEvent);
            throw new exception_1.UploadFailedException(filename, e.message);
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map