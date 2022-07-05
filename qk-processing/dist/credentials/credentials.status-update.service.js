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
exports.CredentialsStatusUpdateService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const event_1 = require("./event");
let CredentialsStatusUpdateService = class CredentialsStatusUpdateService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async toActivated(uuid) {
        const credentials = await this.prisma.credential.findUnique({
            where: { uuid: uuid },
            include: { student: true },
        });
        if (null === credentials) {
            throw new exception_1.CredentialsNotFoundException(uuid);
        }
        if (credentials.status !== client_1.CredentialStatus.UPLOADED_TO_BLOCKCHAIN) {
            common_1.Logger.warn("Wrong credentials status");
            return;
        }
        await this.prisma.credential.update({
            data: { status: client_1.CredentialStatus.ACTIVATED },
            where: { uuid: uuid },
        });
        common_1.Logger.debug(`Credentials ${uuid} status changed to ACTIVATED`);
        const credentialsActivatedEvent = new event_1.CredentialsActivatedEvent();
        credentialsActivatedEvent.credentials = credentials;
        credentialsActivatedEvent.student = credentials.student;
        this.eventEmitter.emit("credentials.activated", credentialsActivatedEvent);
    }
    async toUploadingToBlockchain(credentials) {
        if (credentials.status !== client_1.CredentialStatus.NEW) {
            throw new common_1.PreconditionFailedException("Wrong status, unable to change status to UPLOADING_TO_BLOCKCHAIN");
        }
        return await this.prisma.credential.update({
            data: { status: client_1.CredentialStatus.UPLOADING_TO_BLOCKCHAIN },
            where: { uuid: credentials.uuid },
        });
    }
    async toFailedUploadingToBlockchain(credentials) {
        if (credentials.status !== client_1.CredentialStatus.UPLOADING_TO_BLOCKCHAIN) {
            throw new common_1.PreconditionFailedException("Wrong status, unable to change status to FAILED_UPLOADING_TO_BLOCKCHAIN");
        }
        return await this.prisma.credential.update({
            data: { status: client_1.CredentialStatus.FAILED_UPLOADING_TO_BLOCKCHAIN },
            where: { uuid: credentials.uuid },
        });
    }
    async toUploadedToBlockchain(credentials) {
        if (credentials.status === client_1.CredentialStatus.UPLOADING_TO_BLOCKCHAIN || credentials.status === client_1.CredentialStatus.FAILED_UPLOADING_TO_BLOCKCHAIN) {
            return await this.prisma.credential.update({
                data: { status: client_1.CredentialStatus.UPLOADED_TO_BLOCKCHAIN },
                where: { uuid: credentials.uuid },
            });
        }
        throw new common_1.PreconditionFailedException(`Wrong status ${credentials.status}, unable to change status to UPLOADED_TO_BLOCKCHAIN`);
    }
    async toWithdrawn(credentials) {
        return await this.prisma.credential.update({
            data: { status: client_1.CredentialStatus.WITHDRAWN },
            where: { uuid: credentials.uuid },
        });
    }
};
CredentialsStatusUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], CredentialsStatusUpdateService);
exports.CredentialsStatusUpdateService = CredentialsStatusUpdateService;
//# sourceMappingURL=credentials.status-update.service.js.map