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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const credentials_change_request_service_1 = require("../credentials/credentials.change-request.service");
const credentials_service_1 = require("../credentials/credentials.service");
const upload_service_1 = require("../upload/upload.service");
const action_repository_1 = require("./action.repository");
let ActionService = class ActionService {
    constructor(actionRepository, uploadService, credentialsService, credentialsChangeRequestService) {
        this.actionRepository = actionRepository;
        this.uploadService = uploadService;
        this.credentialsService = credentialsService;
        this.credentialsChangeRequestService = credentialsChangeRequestService;
    }
    async processDecision(user, dto) {
        const action = await this.actionRepository.getById(+dto.actionId);
        if (action.userUuid !== user.uuid)
            throw new common_1.ForbiddenException();
        if (action.type !== dto.type)
            throw new exception_1.LogicException("Action type should match");
        if (action.subjectUuid !== dto.subjectUuid)
            throw new exception_1.LogicException("Action subject should match");
        switch (action.type) {
            case client_1.UserActionType.REVIEW_UPLOAD:
                await this.uploadService.processDecisionForUpload(action.subjectUuid, user, action.id, dto.decision);
                break;
            case client_1.UserActionType.REVIEW_WITHDRAWAL:
                await this.credentialsService.processCredentialsWithdrawalDecision(action.subjectUuid, user, action.id, dto.decision);
                break;
            case client_1.UserActionType.REVIEW_CHANGE_REQUEST:
                await this.credentialsChangeRequestService.processCredentialsChangeRequestDecision(action.subjectUuid, user, dto.decision);
                break;
            default:
                throw new common_1.NotImplementedException(action.type);
        }
    }
};
ActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [action_repository_1.ActionRepository,
        upload_service_1.UploadService,
        credentials_service_1.CredentialsService,
        credentials_change_request_service_1.CredentialsChangeRequestService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map