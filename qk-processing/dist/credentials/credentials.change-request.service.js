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
exports.CredentialsChangeRequestService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const decision_enum_1 = require("../action/enum/decision.enum");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const user_repository_1 = require("../user/user.repository");
const credentials_change_service_1 = require("./credentials-change.service");
const credentials_change_request_repository_1 = require("./repository/credentials.change-request.repository");
const credentials_repository_1 = require("./repository/credentials.repository");
let CredentialsChangeRequestService = class CredentialsChangeRequestService {
    constructor(credentialsNotifyQueue, credentialsRepository, credentialsChangeRequestRepository, prisma, userRepository, credentialsChangeService) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.credentialsRepository = credentialsRepository;
        this.credentialsChangeRequestRepository = credentialsChangeRequestRepository;
        this.prisma = prisma;
        this.userRepository = userRepository;
        this.credentialsChangeService = credentialsChangeService;
    }
    async createChangeRequest(credentials, dto) {
        if (await this.credentialsChangeRequestRepository.hasActiveByCredentialsUuid(credentials.uuid)) {
            throw new exception_1.CredentialsChangeRequestAlreadyCreatedException(credentials.uuid);
        }
        const changedFrom = [];
        for (const field of dto.fieldName) {
            changedFrom.push(credentials[field]);
        }
        const institution = await this.prisma.institution.findUnique({
            where: { uuid: credentials.institutionUuid },
            include: { representatives: { where: { status: client_1.UserStatus.ACTIVE } } },
        });
        if (!institution)
            throw new common_1.NotFoundException("institution not found");
        const credentialChangeRequest = await this.prisma.credentialChangeRequest.create({
            data: {
                credentialUuid: credentials.uuid,
                requestedBy: credentials.studentUuid,
                confirmationRequestedFrom: institution.representatives.map(r => r.uuid),
                changeFrom: changedFrom,
                changeTo: dto.changedTo,
                fieldName: dto.fieldName,
            },
        });
        common_1.Logger.debug(`CredentialsChangeRequest created ${credentialChangeRequest.uuid}`);
        for (const representative of institution.representatives) {
            await this.prisma.userActions.create({
                data: {
                    userUuid: representative.uuid,
                    initiatorName: credentials.graduatedName.trim(),
                    type: client_1.UserActionType.REVIEW_CHANGE_REQUEST,
                    subjectUuid: credentialChangeRequest.uuid,
                    credentialsUuid: credentials.uuid,
                },
            });
            common_1.Logger.debug(`Dispatching credential change request email to: ${representative.email}`);
            await this.credentialsNotifyQueue.add("credentials-change-requested", { recipientEmail: representative.email });
        }
        return credentialChangeRequest;
    }
    async processCredentialsChangeRequestDecision(uuid, decisionMadeBy, decision) {
        const isApproved = decision === decision_enum_1.Decision.APPROVE;
        if (isApproved) {
            await this.approveChangeRequest(uuid, decisionMadeBy);
        }
        else {
            await this.rejectChangeRequest(uuid, decisionMadeBy);
        }
    }
    async approveChangeRequest(uuid, approvedBy) {
        const changeRequest = await this.getCheckedCredentialChangeRequest(uuid, approvedBy);
        if (changeRequest.status !== client_1.CredentialChangeRequestStatus.PENDING) {
            throw new exception_1.LogicException(`ChangeRequest ${changeRequest.uuid} already ${changeRequest.status}`);
        }
        await this.updateStatus(uuid, approvedBy, client_1.CredentialChangeRequestStatus.APPROVED);
        await this.prisma.userActions.updateMany({
            data: { status: client_1.UserActionStatus.DECISION_MADE },
            where: {
                subjectUuid: uuid,
                status: client_1.UserActionStatus.ACTIVE,
            },
        });
        const credentials = await this.credentialsRepository.getByUuid(changeRequest.credentialUuid);
        await this.credentialsChangeService.processCredentialChange(approvedBy, credentials, changeRequest.changeTo, changeRequest.fieldName);
    }
    async rejectChangeRequest(uuid, rejectedBy) {
        const changeRequest = await this.getCheckedCredentialChangeRequest(uuid, rejectedBy);
        if (changeRequest.status !== client_1.CredentialChangeRequestStatus.PENDING) {
            throw new exception_1.LogicException(`ChangeRequest ${changeRequest.uuid} already ${changeRequest.status}`);
        }
        await this.updateStatus(uuid, rejectedBy, client_1.CredentialChangeRequestStatus.REJECTED);
        await this.prisma.userActions.updateMany({
            data: { status: client_1.UserActionStatus.DECISION_MADE },
            where: {
                subjectUuid: uuid,
                status: client_1.UserActionStatus.ACTIVE,
            },
        });
        const student = await this.userRepository.getByUuid(changeRequest.requestedBy);
        common_1.Logger.debug(`Dispatching credential change request rejected email to: ${student.email}`);
        await this.credentialsNotifyQueue.add("credentials-change-rejected", { recipientEmail: student.email });
    }
    async getCheckedCredentialChangeRequest(uuid, actionMadeBy) {
        const changeRequest = await this.credentialsChangeRequestRepository.getByUuid(uuid);
        if (!changeRequest.confirmationRequestedFrom.includes(actionMadeBy.uuid))
            throw new common_1.ForbiddenException();
        return changeRequest;
    }
    async updateStatus(uuid, approvedBy, status) {
        await this.prisma.credentialChangeRequest.update({
            data: {
                confirmedBy: approvedBy.uuid,
                status: status,
            },
            where: { uuid: uuid },
        });
    }
};
CredentialsChangeRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, credentials_repository_1.CredentialsRepository,
        credentials_change_request_repository_1.CredentialsChangeRequestRepository,
        prisma_service_1.PrismaService,
        user_repository_1.UserRepository,
        credentials_change_service_1.CredentialsChangeService])
], CredentialsChangeRequestService);
exports.CredentialsChangeRequestService = CredentialsChangeRequestService;
//# sourceMappingURL=credentials.change-request.service.js.map