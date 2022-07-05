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
const client_1 = require("@prisma/client");
const decision_enum_1 = require("../action/enum/decision.enum");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const event_1 = require("./event");
const exception_2 = require("./exception");
let UploadService = class UploadService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async processUpload(filename, originalFilename, mapping, uploadedBy) {
        try {
            const institution = await this.prisma.institution.findUnique({
                where: { uuid: uploadedBy.institutionUuid },
                include: { representatives: true },
            });
            if (!institution)
                throw new common_1.NotFoundException("institution not found");
            const representatives = institution.representatives.filter(r => (r.uuid !== uploadedBy.uuid && r.status === client_1.UserStatus.ACTIVE));
            const upload = await this.prisma.upload.create({
                data: {
                    uuid: filename.split(".")[0],
                    filename: filename,
                    originalFilename: originalFilename,
                    mapping: mapping,
                    uploadedBy: uploadedBy.uuid,
                    confirmationsRequestedFrom: representatives.map(r => r.uuid),
                },
            });
            const uploadSucceededEvent = new event_1.UploadSucceededEvent();
            uploadSucceededEvent.upload = upload;
            uploadSucceededEvent.representatives = representatives;
            this.eventEmitter.emit("upload.succeeded", uploadSucceededEvent);
            if (0 === representatives.length) {
                const uploadApprovedEvent = new event_1.UploadApprovedEvent();
                uploadApprovedEvent.upload = upload;
                uploadApprovedEvent.representatives = [];
                uploadApprovedEvent.approvedBy = uploadedBy;
                this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
                return;
            }
            for (const representative of representatives) {
                await this.prisma.userActions.create({
                    data: {
                        userUuid: representative.uuid,
                        initiatorName: (uploadedBy.firstName + " " + uploadedBy.lastName).trim(),
                        type: client_1.UserActionType.REVIEW_UPLOAD,
                        subjectUuid: upload.uuid,
                    },
                });
            }
        }
        catch (e) {
            common_1.Logger.error(e);
            const uploadFailedEvent = new event_1.UploadFailedEvent();
            uploadFailedEvent.filename = filename;
            uploadFailedEvent.uploadedBy = uploadedBy.uuid;
            this.eventEmitter.emit("upload.failed", uploadFailedEvent);
            throw new exception_2.UploadFailedException(filename, e.message);
        }
    }
    async processDecisionForUpload(uuid, decisionMadeBy, actionId, decision) {
        const isApproved = decision === decision_enum_1.Decision.APPROVE;
        if (isApproved) {
            await this.approveUpload(uuid, decisionMadeBy, actionId);
        }
        else {
            await this.rejectUpload(uuid, decisionMadeBy);
        }
    }
    async approveUpload(uuid, approvedBy, actionId) {
        const upload = await this.getCheckedUpload(uuid, approvedBy);
        const requestedFrom = upload.confirmationsRequestedFrom;
        let confirmedBy = [];
        if (0 === upload.confirmedBy.length) {
            await this.prisma.upload.update({
                data: { confirmedBy: approvedBy.uuid },
                where: { uuid: uuid },
            });
            confirmedBy.push(approvedBy.uuid);
        }
        else {
            confirmedBy = upload.confirmedBy;
            if (confirmedBy.includes(approvedBy.uuid))
                throw new exception_1.LogicException("Already approved.");
            confirmedBy.push(approvedBy.uuid);
            await this.prisma.upload.update({
                data: { confirmedBy: confirmedBy.map(uuid => uuid) },
                where: { uuid: uuid },
            });
        }
        await this.prisma.userActions.update({
            data: { status: client_1.UserActionStatus.DECISION_MADE },
            where: { id: actionId },
        });
        if (confirmedBy.length === requestedFrom.length) {
            const institution = await this.prisma.institution.findUnique({
                where: { uuid: approvedBy.institutionUuid },
                include: { representatives: true },
            });
            if (!institution)
                throw new common_1.NotFoundException("institution not found");
            const uploadApprovedEvent = new event_1.UploadApprovedEvent();
            uploadApprovedEvent.upload = upload;
            uploadApprovedEvent.representatives = institution.representatives;
            uploadApprovedEvent.approvedBy = approvedBy;
            this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
        }
    }
    async rejectUpload(uuid, rejectedBy) {
        const upload = await this.getCheckedUpload(uuid, rejectedBy);
        await this.prisma.userActions.updateMany({
            data: { status: client_1.UserActionStatus.DECISION_MADE },
            where: {
                type: client_1.UserActionType.REVIEW_UPLOAD,
                subjectUuid: uuid,
            },
        });
        const institution = await this.prisma.institution.findUnique({
            where: { uuid: rejectedBy.institutionUuid },
            include: { representatives: true },
        });
        if (!institution)
            throw new common_1.NotFoundException("institution not found");
        const uploadRejectedEvent = new event_1.UploadRejectedEvent();
        uploadRejectedEvent.upload = upload;
        uploadRejectedEvent.rejectedBy = rejectedBy;
        uploadRejectedEvent.representatives = institution.representatives;
        this.eventEmitter.emit("upload.rejected", uploadRejectedEvent);
    }
    async getCheckedUpload(uuid, actionMadeBy) {
        const upload = await this.prisma.upload.findUnique({ where: { uuid: uuid } });
        if (!upload)
            throw new common_1.NotFoundException("upload not found");
        if (upload.status !== client_1.UploadStatus.PENDING)
            throw new exception_1.LogicException("Wrong upload status.");
        const requestedFrom = upload.confirmationsRequestedFrom;
        if (!requestedFrom.includes(actionMadeBy.uuid))
            throw new common_1.ForbiddenException();
        return upload;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map