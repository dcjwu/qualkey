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
exports.HederaController = void 0;
const common_1 = require("@nestjs/common");
const exception_1 = require("../common/exception");
const credentials_change_repository_1 = require("../credentials/repository/credentials-change.repository");
const hedera_service_1 = require("./hedera.service");
let HederaController = class HederaController {
    constructor(hederaService, credentialsChangeRepository) {
        this.hederaService = hederaService;
        this.credentialsChangeRepository = credentialsChangeRepository;
    }
    async getCredentialsFromSmartContract(did) {
        const credentialChange = await this.credentialsChangeRepository.getLastByCredentialsDid(did);
        if (null === credentialChange)
            throw new exception_1.LogicException("Credentials were not uploaded to Hedera");
        return await this.hederaService.getCredentialChangeDataFromSmartContract(credentialChange.id, credentialChange.smartContractId);
    }
};
__decorate([
    (0, common_1.Get)(":did"),
    __param(0, (0, common_1.Param)("did")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "getCredentialsFromSmartContract", null);
HederaController = __decorate([
    (0, common_1.Controller)("hedera"),
    __metadata("design:paramtypes", [hedera_service_1.HederaService,
        credentials_change_repository_1.CredentialsChangeRepository])
], HederaController);
exports.HederaController = HederaController;
//# sourceMappingURL=hedera.controller.js.map