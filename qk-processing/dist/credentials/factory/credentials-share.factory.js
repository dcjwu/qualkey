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
exports.CredentialsShareFactory = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const password_generator_service_1 = require("../../user/helper/password-generator.service");
let CredentialsShareFactory = class CredentialsShareFactory {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, credentialsList) {
        return this.prisma.credentialShare.create({
            data: {
                recipientEmails: dto.recipientEmails,
                sharedBy: credentialsList[0].studentUuid,
                credentialUuids: credentialsList.map(c => c.uuid),
                credentialQualificationNames: credentialsList.map(c => c.qualificationName),
                sharedFields: dto.sharedFields,
                temporaryPassword: password_generator_service_1.PasswordGenerator.generate(4, true, false),
                expiresAt: new Date(dto.expiresAt),
            },
        });
    }
};
CredentialsShareFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CredentialsShareFactory);
exports.CredentialsShareFactory = CredentialsShareFactory;
//# sourceMappingURL=credentials-share.factory.js.map