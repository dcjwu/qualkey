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
exports.CredentialsService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const client_1 = require("@prisma/client");
const decision_enum_1 = require("../action/enum/decision.enum");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const event_1 = require("./event");
const credentials_withdrawal_request_factory_1 = require("./factory/credentials-withdrawal-request.factory");
const credentials_repository_1 = require("./repository/credentials.repository");
const credentials_withdrawal_request_repository_1 = require("./repository/credentials.withdrawal-request.repository");
let CredentialsService = class CredentialsService {
    constructor(credentialsNotifyQueue, prisma, credentialsRepository, credentialsWithdrawalRequestRepository, credentialsWithdrawalRequestFactory, eventEmitter) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.prisma = prisma;
        this.credentialsRepository = credentialsRepository;
        this.credentialsWithdrawalRequestRepository = credentialsWithdrawalRequestRepository;
        this.credentialsWithdrawalRequestFactory = credentialsWithdrawalRequestFactory;
        this.eventEmitter = eventEmitter;
    }
    async createCredentialsWithdrawalRequest(uuid, initiatedBy) {
        if (await this.credentialsWithdrawalRequestRepository.hasCredentialsUuid(uuid)) {
            throw new common_1.ConflictException("Withdrawal request already exists");
        }
        const credentials = await this.prisma.credential.findUnique({ where: { uuid: uuid } });
        if (!credentials)
            throw new common_1.NotFoundException("credentials not found");
        if (credentials.institutionUuid !== initiatedBy.institutionUuid)
            throw new common_1.ForbiddenException();
        if (credentials.status === client_1.CredentialStatus.WITHDRAWN)
            throw new common_1.PreconditionFailedException("Already WITHDRAWN");
        const institution = await this.prisma.institution.findUnique({
            where: { uuid: initiatedBy.institutionUuid },
            include: { representatives: true },
        });
        if (!institution)
            throw new common_1.NotFoundException("institution not found");
        const representatives = institution.representatives.filter(r => r.uuid !== initiatedBy.uuid);
        const credentialsWithdrawalRequest = await this.credentialsWithdrawalRequestFactory.create(uuid, initiatedBy, representatives);
        common_1.Logger.debug("credentials withdrawal request CREATED");
        if (0 !== representatives.length) {
            for (const representative of representatives) {
                await this.prisma.userActions.create({
                    data: {
                        userUuid: representative.uuid,
                        initiatorName: (initiatedBy.firstName + " " + initiatedBy.lastName).trim(),
                        type: client_1.UserActionType.REVIEW_WITHDRAWAL,
                        subjectUuid: credentialsWithdrawalRequest.uuid,
                        credentialsUuid: credentials.uuid,
                    },
                });
            }
            representatives.forEach((user) => {
                common_1.Logger.debug(`Dispatching ${user.uuid}`);
                this.credentialsNotifyQueue.add("withdrawal-request-created", {
                    representativeUuid: user.uuid,
                    representativeEmail: user.email,
                });
            });
        }
        else {
            const credentialsWithdrawalApprovedEvent = new event_1.CredentialsWithdrawalApprovedEvent();
            credentialsWithdrawalApprovedEvent.credentials = await this.credentialsRepository.getByUuid(credentialsWithdrawalRequest.credentialsUuid);
            credentialsWithdrawalApprovedEvent.representatives = institution.representatives;
            this.eventEmitter.emit("credentials.withdrawal.approved", credentialsWithdrawalApprovedEvent);
        }
        return credentialsWithdrawalRequest;
    }
    async processCredentialsWithdrawalDecision(uuid, decisionMadeBy, actionId, decision) {
        const isApproved = decision === decision_enum_1.Decision.APPROVE;
        if (isApproved) {
            await this.approveWithdrawal(uuid, decisionMadeBy, actionId);
        }
        else {
            await this.rejectWithdrawal(uuid, decisionMadeBy);
        }
    }
    async approveWithdrawal(uuid, approvedBy, actionId) {
        const credentialsWithdrawalRequest = await this.getCheckedCredentialsWithdrawalRequest(uuid, approvedBy);
        const requestedFrom = credentialsWithdrawalRequest.confirmationsRequestedFrom;
        let confirmedBy = [];
        if (0 === credentialsWithdrawalRequest.confirmedBy.length) {
            await this.prisma.credentialsWithdrawalRequest.update({
                data: { confirmedBy: approvedBy.uuid },
                where: { uuid: uuid },
            });
            confirmedBy.push(approvedBy.uuid);
        }
        else {
            confirmedBy = credentialsWithdrawalRequest.confirmedBy;
            if (confirmedBy.includes(approvedBy.uuid))
                throw new exception_1.LogicException("Already approved.");
            confirmedBy.push(approvedBy.uuid);
            await this.prisma.credentialsWithdrawalRequest.update({
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
            const credentialsWithdrawalApprovedEvent = new event_1.CredentialsWithdrawalApprovedEvent();
            credentialsWithdrawalApprovedEvent.credentials = await this.credentialsRepository.getByUuid(credentialsWithdrawalRequest.credentialsUuid);
            credentialsWithdrawalApprovedEvent.representatives = institution.representatives;
            this.eventEmitter.emit("credentials.withdrawal.approved", credentialsWithdrawalApprovedEvent);
        }
    }
    async rejectWithdrawal(uuid, rejectedBy) {
        const credentialsWithdrawalRequest = await this.getCheckedCredentialsWithdrawalRequest(uuid, rejectedBy);
        await this.prisma.userActions.updateMany({
            data: { status: client_1.UserActionStatus.DECISION_MADE },
            where: {
                subjectUuid: uuid,
                type: client_1.UserActionType.REVIEW_WITHDRAWAL,
            },
        });
        const institution = await this.prisma.institution.findUnique({
            where: { uuid: rejectedBy.institutionUuid },
            include: { representatives: true },
        });
        if (!institution)
            throw new common_1.NotFoundException("institution not found");
        const credentialsWithdrawalRejectedEvent = new event_1.CredentialsWithdrawalRejectedEvent();
        credentialsWithdrawalRejectedEvent.credentials = await this.credentialsRepository.getByUuid(credentialsWithdrawalRequest.credentialsUuid);
        credentialsWithdrawalRejectedEvent.representatives = institution.representatives;
        this.eventEmitter.emit("credentials.withdrawal.rejected", credentialsWithdrawalRejectedEvent);
    }
    async getCheckedCredentialsWithdrawalRequest(uuid, actionMadeBy) {
        const credentialsWithdrawalRequest = await this.credentialsWithdrawalRequestRepository.getByUuid(uuid);
        if (!credentialsWithdrawalRequest.confirmationsRequestedFrom.includes(actionMadeBy.uuid))
            throw new common_1.ForbiddenException();
        return credentialsWithdrawalRequest;
    }
    async deleteCredentials(credentials) {
        common_1.Logger.debug(`Processing deletion of the credentials ${credentials.did}`);
        await this.prisma.credential.update({
            data: {
                status: client_1.CredentialStatus.DELETED,
                certificateId: null,
                graduatedName: null,
                qualificationName: null,
                majors: null,
                minors: null,
                awardingInstitution: null,
                qualificationLevel: null,
                awardLevel: null,
                studyLanguage: null,
                info: null,
                gpaFinalGrade: null,
                studyStartedAt: null,
                studyEndedAt: null,
                graduatedAt: null,
                expiresAt: null,
                authenticatedAt: null,
                authenticatedBy: null,
                authenticatedTitle: null,
            },
            where: { did: credentials.did },
        });
        common_1.Logger.debug(`Credentials data deleted successfully ${credentials.did}`);
    }
};
CredentialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService,
        credentials_repository_1.CredentialsRepository,
        credentials_withdrawal_request_repository_1.CredentialsWithdrawalRequestRepository,
        credentials_withdrawal_request_factory_1.CredentialsWithdrawalRequestFactory,
        event_emitter_1.EventEmitter2])
], CredentialsService);
exports.CredentialsService = CredentialsService;
//# sourceMappingURL=credentials.service.js.map