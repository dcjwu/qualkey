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
exports.CredentialsChangeRepository = void 0;
const common_1 = require("@nestjs/common");
const exception_1 = require("../../common/exception");
const prisma_service_1 = require("../../prisma/prisma.service");
let CredentialsChangeRepository = class CredentialsChangeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(id) {
        const credentialsChange = await this.prisma.credentialChange.findUnique({ where: { id: id } });
        if (credentialsChange === null)
            throw new exception_1.CredentialsChangeNotFoundException(id);
        return credentialsChange;
    }
    async hasHash(hash) {
        const credentialsChange = await this.prisma.credentialChange.findUnique({ where: { hash: hash } });
        return (null !== credentialsChange);
    }
    async getByHash(hash) {
        const credentialsChange = await this.prisma.credentialChange.findUnique({ where: { hash: hash } });
        if (null === credentialsChange) {
            throw new common_1.NotFoundException(`There is no CredentialsChange found for hash: ${hash}`);
        }
        return credentialsChange;
    }
    async getLastByCredentialsDid(credentialDid) {
        const credentialsChange = await this.prisma.credentialChange.findFirst({
            where: { credentialDid: credentialDid },
            orderBy: { createdAt: "desc" },
        });
        if (null === credentialsChange) {
            throw new common_1.NotFoundException(`There is no CredentialsChange found for credentials: ${credentialDid}`);
        }
        return credentialsChange;
    }
};
CredentialsChangeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CredentialsChangeRepository);
exports.CredentialsChangeRepository = CredentialsChangeRepository;
//# sourceMappingURL=credentials-change.repository.js.map