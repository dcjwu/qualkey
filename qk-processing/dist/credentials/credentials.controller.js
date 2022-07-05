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
exports.CredentialsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const credentials_change_service_1 = require("./credentials-change.service");
const credentials_share_service_1 = require("./credentials-share.service");
const credentials_change_request_service_1 = require("./credentials.change-request.service");
const credentials_service_1 = require("./credentials.service");
const dto_1 = require("./dto");
const credentials_request_change_dto_1 = require("./dto/credentials.request-change.dto");
const credentials_change_repository_1 = require("./repository/credentials-change.repository");
const credentials_share_repository_1 = require("./repository/credentials-share.repository");
const credentials_repository_1 = require("./repository/credentials.repository");
let CredentialsController = class CredentialsController {
    constructor(credentialsService, credentialsRepository, credentialsShareService, credentialsShareRepository, credentialsChangeService, credentialsChangeRepository, credentialsChangeRequestService) {
        this.credentialsService = credentialsService;
        this.credentialsRepository = credentialsRepository;
        this.credentialsShareService = credentialsShareService;
        this.credentialsShareRepository = credentialsShareRepository;
        this.credentialsChangeService = credentialsChangeService;
        this.credentialsChangeRepository = credentialsChangeRepository;
        this.credentialsChangeRequestService = credentialsChangeRequestService;
    }
    async getCredentials(user, dto) {
        if (dto.uuid) {
            const credentials = await this.credentialsRepository.getByUuidWithChanges(dto.uuid);
            if (user.role === client_1.Role.STUDENT && user.uuid !== credentials.studentUuid) {
                throw new common_1.ForbiddenException();
            }
            if (user.role === client_1.Role.INSTITUTION_REPRESENTATIVE && user.institutionUuid !== credentials.institutionUuid) {
                throw new common_1.ForbiddenException();
            }
            return [credentials];
        }
        if (user.role === client_1.Role.STUDENT) {
            return this.credentialsRepository.getAllForStudent(user, dto.filter);
        }
        if (user.role === client_1.Role.INSTITUTION_REPRESENTATIVE) {
            return this.credentialsRepository.getAllForInstitution(user, dto.offset, dto.limit, dto.filter);
        }
        throw new common_1.ForbiddenException();
    }
    async postCredentialsWithdrawalRequest(user, dto) {
        if (user.role !== client_1.Role.INSTITUTION_REPRESENTATIVE)
            throw new common_1.ForbiddenException();
        return await this.credentialsService.createCredentialsWithdrawalRequest(dto.uuid, user);
    }
    async postCredentialsShare(user, dto) {
        const userShares = await this.credentialsShareRepository.findAllByUser(user);
        if (userShares.length > 0) {
            const canBeSharedAt = new Date(userShares[0].createdAt.getTime() + 60000);
            if (canBeSharedAt > new Date()) {
                throw new common_1.PreconditionFailedException("It is possible to share once per minute");
            }
        }
        const credentialsList = [];
        for (const uuid of dto.uuids) {
            const credentials = await this.credentialsRepository.getByUuid(uuid);
            if (user.uuid !== credentials.studentUuid) {
                throw new common_1.ForbiddenException("You can share only your own credentials");
            }
            if (credentials.status !== client_1.CredentialStatus.ACTIVATED) {
                throw new common_1.PreconditionFailedException("Please activate credentials in order to share it");
            }
            credentialsList.push(credentials);
        }
        return await this.credentialsShareService.processCredentialsShare(dto, credentialsList);
    }
    async getCredentialsShares(user, dto) {
        if (null === dto.credentialUuid) {
            return await this.credentialsShareRepository.findAllByUser(user);
        }
        return await this.credentialsShareRepository.findAllByCredentialUuid(user, dto.credentialUuid);
    }
    async getCredentialsViewData(user, did) {
        const credentials = await this.credentialsRepository.getByDidWithLastChange(did);
        if (user.uuid !== credentials.studentUuid)
            throw new common_1.ForbiddenException();
        return credentials;
    }
    async getCredentialChange(user, dto) {
        return await this.credentialsChangeRepository.getById(dto.id);
    }
    async postCredentialChange(user, dto) {
        if (user.role !== client_1.Role.INSTITUTION_REPRESENTATIVE)
            throw new common_1.ForbiddenException();
        const credentials = await this.credentialsRepository.getByUuid(dto.uuid);
        if (user.institutionUuid !== credentials.institutionUuid) {
            throw new common_1.ForbiddenException(`You can change only credentials issued by your institution.`);
        }
        return await this.credentialsChangeService.processCredentialChange(user, credentials, dto.changedTo, dto.fieldName);
    }
    async postCredentialChangeRequest(user, dto) {
        if (user.role !== client_1.Role.STUDENT)
            throw new common_1.ForbiddenException();
        const credentials = await this.credentialsRepository.getByUuid(dto.uuid);
        if (user.uuid !== credentials.studentUuid) {
            throw new common_1.ForbiddenException("You can request to change only your own credentials");
        }
        return await this.credentialsChangeRequestService.createChangeRequest(credentials, dto);
    }
    async deleteCredentials(user, uuid) {
        if (user.role !== client_1.Role.STUDENT)
            throw new common_1.ForbiddenException();
        const credentials = await this.credentialsRepository.getByUuid(uuid);
        if (user.uuid !== credentials.studentUuid) {
            throw new common_1.ForbiddenException("You can delete only your own credentials");
        }
        await this.credentialsService.deleteCredentials(credentials);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CredentialsGetRequestDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "getCredentials", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("withdraw"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CredentialsWithdrawalRequestDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "postCredentialsWithdrawalRequest", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("share"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CredentialsShareRequestDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "postCredentialsShare", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("share"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CredentialsGetSharesRequestDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "getCredentialsShares", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(":did/view"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("did")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "getCredentialsViewData", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("change"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CredentialsChangeGetRequestDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "getCredentialChange", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("change"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, credentials_request_change_dto_1.CredentialsRequestChangeDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "postCredentialChange", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("request-change"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, credentials_request_change_dto_1.CredentialsRequestChangeDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "postCredentialChangeRequest", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)(":uuid"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "deleteCredentials", null);
CredentialsController = __decorate([
    (0, common_1.Controller)("credential"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService,
        credentials_repository_1.CredentialsRepository,
        credentials_share_service_1.CredentialsShareService,
        credentials_share_repository_1.CredentialsShareRepository,
        credentials_change_service_1.CredentialsChangeService,
        credentials_change_repository_1.CredentialsChangeRepository,
        credentials_change_request_service_1.CredentialsChangeRequestService])
], CredentialsController);
exports.CredentialsController = CredentialsController;
//# sourceMappingURL=credentials.controller.js.map