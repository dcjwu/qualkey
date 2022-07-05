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
exports.CredentialsPublicViewDtoFactory = void 0;
const common_1 = require("@nestjs/common");
const institution_repository_1 = require("../../institution/repository/institution.repository");
const upload_repository_1 = require("../../upload/repository/upload.repository");
const user_repository_1 = require("../../user/user.repository");
const dto_1 = require("../dto");
let CredentialsPublicViewDtoFactory = class CredentialsPublicViewDtoFactory {
    constructor(uploadRepository, userRepository, institutionRepository) {
        this.uploadRepository = uploadRepository;
        this.userRepository = userRepository;
        this.institutionRepository = institutionRepository;
    }
    async createFromCredentials(credentials, credentialChange, allowed) {
        const upload = await this.uploadRepository.getByUuid(credentials.uploadUuid);
        const authenticatedByUser = await this.userRepository.getByUuid(upload.uploadedBy);
        const institution = await this.institutionRepository.getByUuid(credentials.institutionUuid);
        return new dto_1.CredentialsPublicViewDto(credentials.did, credentialChange.smartContractId, allowed.includes("certificateId") ? credentials.certificateId : undefined, credentials.graduatedName, credentials.qualificationName, allowed.includes("majors") ? credentials.majors : undefined, allowed.includes("minors") ? credentials.minors : undefined, credentials.awardingInstitution, allowed.includes("qualificationLevel") ? credentials.qualificationLevel : undefined, allowed.includes("awardLevel") ? credentials.awardLevel : undefined, allowed.includes("studyLanguage") ? credentials.studyLanguage : undefined, allowed.includes("info") ? credentials.info : undefined, allowed.includes("gpaFinalGrade") ? credentials.gpaFinalGrade : undefined, allowed.includes("studyStartedAt") ? credentials.studyStartedAt : undefined, allowed.includes("studyEndedAt") ? credentials.studyEndedAt : undefined, allowed.includes("graduatedAt") ? credentials.graduatedAt : undefined, credentials.authenticatedBy, credentials.authenticatedTitle, credentials.authenticatedAt, authenticatedByUser.signatureUrl, institution.logoUrl, institution.stampUrl);
    }
};
CredentialsPublicViewDtoFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [upload_repository_1.UploadRepository,
        user_repository_1.UserRepository,
        institution_repository_1.InstitutionRepository])
], CredentialsPublicViewDtoFactory);
exports.CredentialsPublicViewDtoFactory = CredentialsPublicViewDtoFactory;
//# sourceMappingURL=credentials.public-view-dto.factory.js.map