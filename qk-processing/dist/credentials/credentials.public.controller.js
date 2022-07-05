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
exports.CredentialsPublicController = void 0;
const common_1 = require("@nestjs/common");
const exception_1 = require("../common/exception");
const credentials_share_service_1 = require("./credentials-share.service");
const credentials_service_1 = require("./credentials.service");
const credentials_public_view_dto_factory_1 = require("./factory/credentials.public-view-dto.factory");
const credentials_change_repository_1 = require("./repository/credentials-change.repository");
const credentials_share_repository_1 = require("./repository/credentials-share.repository");
const credentials_repository_1 = require("./repository/credentials.repository");
let CredentialsPublicController = class CredentialsPublicController {
    constructor(credentialsService, credentialsRepository, credentialsShareService, credentialsShareRepository, credentialsChangeRepository, credentialsPublicViewDtoFactory) {
        this.credentialsService = credentialsService;
        this.credentialsRepository = credentialsRepository;
        this.credentialsShareService = credentialsShareService;
        this.credentialsShareRepository = credentialsShareRepository;
        this.credentialsChangeRepository = credentialsChangeRepository;
        this.credentialsPublicViewDtoFactory = credentialsPublicViewDtoFactory;
    }
    async getCredentialsViewData(did) {
        const credentials = await this.credentialsRepository.getByDidWithLastChange(did);
        const credentialChange = await this.credentialsChangeRepository.getLastByCredentialsDid(did);
        const credentialsShares = await this.credentialsShareRepository.findAllNotExpiredByCredentialUuid(credentials.uuid);
        if (0 === credentialsShares.length)
            throw new common_1.ForbiddenException("These credentials were not shared");
        return await this.credentialsPublicViewDtoFactory.createFromCredentials(credentials, credentialChange, credentialsShares[0].sharedFields);
    }
    async getCredentialsSharedList(uuid, password) {
        if (!password)
            throw new common_1.ForbiddenException();
        const credentialsShare = await this.credentialsShareRepository.getByUuid(uuid);
        if (credentialsShare.expiresAt < new Date())
            throw new exception_1.CredentialsShareExpiredException();
        if (password !== credentialsShare.temporaryPassword)
            throw new common_1.ForbiddenException();
        const credentialsPublicViewDtoList = [];
        for (const credentialUuid of credentialsShare.credentialUuids) {
            const credentials = await this.credentialsRepository.getByUuid(credentialUuid);
            const credentialChange = await this.credentialsChangeRepository.getLastByCredentialsDid(credentials.did);
            credentialsPublicViewDtoList.push(await this.credentialsPublicViewDtoFactory.createFromCredentials(credentials, credentialChange, credentialsShare.sharedFields));
        }
        return credentialsPublicViewDtoList;
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(":did"),
    __param(0, (0, common_1.Param)("did")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CredentialsPublicController.prototype, "getCredentialsViewData", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("share/:uuid"),
    __param(0, (0, common_1.Param)("uuid")),
    __param(1, (0, common_1.Query)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CredentialsPublicController.prototype, "getCredentialsSharedList", null);
CredentialsPublicController = __decorate([
    (0, common_1.Controller)("credential"),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService,
        credentials_repository_1.CredentialsRepository,
        credentials_share_service_1.CredentialsShareService,
        credentials_share_repository_1.CredentialsShareRepository,
        credentials_change_repository_1.CredentialsChangeRepository,
        credentials_public_view_dto_factory_1.CredentialsPublicViewDtoFactory])
], CredentialsPublicController);
exports.CredentialsPublicController = CredentialsPublicController;
//# sourceMappingURL=credentials.public.controller.js.map