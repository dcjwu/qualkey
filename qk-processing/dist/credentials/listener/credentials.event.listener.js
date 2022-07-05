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
exports.CredentialsEventListener = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_repository_1 = require("../../user/user.repository");
const credentials_status_update_service_1 = require("../credentials.status-update.service");
const event_1 = require("../event");
const credentials_repository_1 = require("../repository/credentials.repository");
let CredentialsEventListener = class CredentialsEventListener {
    constructor(credentialsNotifyQueue, userRepository, credentialsRepository, prisma, credentialsStatusUpdateService) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.userRepository = userRepository;
        this.credentialsRepository = credentialsRepository;
        this.prisma = prisma;
        this.credentialsStatusUpdateService = credentialsStatusUpdateService;
    }
    async handleCredentialsWithdrawalApprovedEvent(event) {
        common_1.Logger.debug(`credentials withdrawal APPROVED ${event.credentials.uuid}`);
        await this.credentialsStatusUpdateService.toWithdrawn(event.credentials);
        common_1.Logger.debug(`credentials status changed to WITHDRAWN ${event.credentials.uuid}`);
        if (0 !== event.representatives.length) {
            event.representatives.forEach((user) => {
                common_1.Logger.debug(`Dispatching ${user.uuid}`);
                this.credentialsNotifyQueue.add("withdrawal-approved", {
                    representativeUuid: user.uuid,
                    representativeEmail: user.email,
                });
            });
        }
        await this.prisma.credentialsWithdrawalRequest.delete({ where: { credentialsUuid: event.credentials.uuid } });
        common_1.Logger.debug(`WithdrawalRequest for credentials ${event.credentials.uuid} was removed`);
        const student = await this.userRepository.getByUuid(event.credentials.studentUuid);
        await this.credentialsNotifyQueue.add("credentials-withdrawn-student", { recipientEmail: student.email });
    }
    async handleCredentialsWithdrawalRejectedEvent(event) {
        common_1.Logger.debug(`credentials withdrawal REJECTED ${event.credentials.uuid}`);
        if (0 !== event.representatives.length) {
            event.representatives.forEach((user) => {
                common_1.Logger.debug(`Dispatching ${user.uuid}`);
                this.credentialsNotifyQueue.add("withdrawal-rejected", {
                    representativeUuid: user.uuid,
                    representativeEmail: user.email,
                });
            });
        }
        await this.prisma.credentialsWithdrawalRequest.delete({ where: { credentialsUuid: event.credentials.uuid } });
        common_1.Logger.debug(`WithdrawalRequest for credentials ${event.credentials.uuid} was removed`);
    }
    async handleCredentialsActivatedEvent(event) {
        common_1.Logger.debug(`credentials ACTIVATED ${event.credentials.uuid}`);
        await this.credentialsNotifyQueue.add("credentials-activated", { studentEmail: event.student.email });
    }
    async handleCredentialsChangedEvent(event) {
        common_1.Logger.debug(`credentials CHANGED ${event.credentials.uuid}`);
        const student = await this.userRepository.getByUuid(event.credentials.studentUuid);
        await this.credentialsNotifyQueue.add("credentials-changed-student", { recipientEmail: student.email });
        const institution = await this.prisma.institution.findUnique({
            where: { uuid: event.credentials.institutionUuid },
            include: { representatives: true },
        });
        if (!institution)
            throw new common_1.NotFoundException("institution not found");
        const representatives = institution.representatives.filter(r => (r.status === client_1.UserStatus.ACTIVE));
        for (const representative of representatives) {
            await this.credentialsNotifyQueue.add("credentials-changed-representative", { recipientEmail: representative.email });
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)("credentials.withdrawal.approved"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.CredentialsWithdrawalApprovedEvent]),
    __metadata("design:returntype", Promise)
], CredentialsEventListener.prototype, "handleCredentialsWithdrawalApprovedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("credentials.withdrawal.rejected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.CredentialsWithdrawalRejectedEvent]),
    __metadata("design:returntype", Promise)
], CredentialsEventListener.prototype, "handleCredentialsWithdrawalRejectedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("credentials.activated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.CredentialsActivatedEvent]),
    __metadata("design:returntype", Promise)
], CredentialsEventListener.prototype, "handleCredentialsActivatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("credentials.changed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.CredentialsChangedEvent]),
    __metadata("design:returntype", Promise)
], CredentialsEventListener.prototype, "handleCredentialsChangedEvent", null);
CredentialsEventListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, user_repository_1.UserRepository,
        credentials_repository_1.CredentialsRepository,
        prisma_service_1.PrismaService,
        credentials_status_update_service_1.CredentialsStatusUpdateService])
], CredentialsEventListener);
exports.CredentialsEventListener = CredentialsEventListener;
//# sourceMappingURL=credentials.event.listener.js.map