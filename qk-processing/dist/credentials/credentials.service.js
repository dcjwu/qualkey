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
exports.CredentialsService = void 0;
const common_1 = require("@nestjs/common");
const credentials_repository_1 = require("./credentials.repository");
let CredentialsService = class CredentialsService {
    constructor(credentialsRepository) {
        this.credentialsRepository = credentialsRepository;
    }
    getCredentials(user) {
        if (user.role === "STUDENT")
            return this.credentialsRepository.getStudentCredentials(user);
        if (user.role === "INSTITUTION_REPRESENTATIVE")
            return this.credentialsRepository.getInstitutionCredentials(user);
        throw new common_1.ForbiddenException();
    }
};
CredentialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [credentials_repository_1.CredentialsRepository])
], CredentialsService);
exports.CredentialsService = CredentialsService;
//# sourceMappingURL=credentials.service.js.map