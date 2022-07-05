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
exports.CredentialsFactory = void 0;
const common_1 = require("@nestjs/common");
const hedera_service_1 = require("../../hedera/hedera.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let CredentialsFactory = class CredentialsFactory {
    constructor(prisma, hedera) {
        this.prisma = prisma;
        this.hedera = hedera;
    }
    async create(dto, student, uploadUuid) {
        const did = await this.hedera.generateDid();
        common_1.Logger.debug(`DID for credentials received - ${did}`);
        return await this.prisma.credential.create({
            data: {
                did: did,
                studentUuid: student.uuid,
                institutionUuid: dto.institutionUuid,
                uploadUuid: uploadUuid,
                certificateId: dto.certificateId,
                graduatedName: dto.graduatedName,
                authenticatedBy: dto.authenticatedBy,
                qualificationName: dto.qualificationName,
                majors: dto.majors,
                minors: dto.minors,
                authenticatedTitle: dto.authenticatedTitle,
                awardingInstitution: dto.awardingInstitution,
                qualificationLevel: dto.qualificationLevel,
                awardLevel: dto.awardLevel,
                studyLanguage: dto.studyLanguage,
                info: dto.info,
                gpaFinalGrade: dto.gpaFinalGrade,
                authenticatedAt: dto.authenticatedAt,
                studyStartedAt: dto.studyStartedAt,
                studyEndedAt: dto.studyEndedAt,
                graduatedAt: dto.graduatedAt,
                expiresAt: dto.expiresAt,
            },
        });
    }
};
CredentialsFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hedera_service_1.HederaService])
], CredentialsFactory);
exports.CredentialsFactory = CredentialsFactory;
//# sourceMappingURL=credentials.factory.js.map