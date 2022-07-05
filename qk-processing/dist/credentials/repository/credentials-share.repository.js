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
exports.CredentialsShareRepository = void 0;
const common_1 = require("@nestjs/common");
const exception_1 = require("../../common/exception");
const prisma_service_1 = require("../../prisma/prisma.service");
let CredentialsShareRepository = class CredentialsShareRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByUuid(uuid) {
        const credentialShare = await this.prisma.credentialShare.findUnique({ where: { uuid: uuid } });
        if (null === credentialShare)
            throw new exception_1.CredentialShareNotFoundException(uuid);
        return credentialShare;
    }
    async findAllByUser(user) {
        return await this.prisma.credentialShare.findMany({
            where: { sharedBy: user.uuid },
            orderBy: { createdAt: "desc" },
        });
    }
    async findAllByCredentialUuid(user, credentialUuid) {
        return await this.prisma.credentialShare.findMany({
            where: {
                AND: [
                    { sharedBy: user.uuid },
                    { credentialUuids: { has: credentialUuid } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findAllNotExpiredByCredentialUuid(credentialUuid) {
        return await this.prisma.credentialShare.findMany({
            where: {
                AND: [
                    { credentialUuids: { has: credentialUuid } },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
    }
};
CredentialsShareRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CredentialsShareRepository);
exports.CredentialsShareRepository = CredentialsShareRepository;
//# sourceMappingURL=credentials-share.repository.js.map