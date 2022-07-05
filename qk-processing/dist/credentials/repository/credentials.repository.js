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
exports.CredentialsRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const exception_1 = require("../../common/exception");
const prisma_service_1 = require("../../prisma/prisma.service");
let CredentialsRepository = class CredentialsRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getByUuid(uuid) {
        const credentials = await this.prismaService.credential.findFirst({
            where: {
                OR: [
                    { uuid: uuid },
                ],
                NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
            },
        });
        if (null === credentials)
            throw new exception_1.CredentialsNotFoundException(uuid);
        return credentials;
    }
    async getByUuidWithChanges(uuid) {
        const credentials = await this.prismaService.credential.findFirst({
            where: {
                OR: [
                    { uuid: uuid },
                ],
                NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
            },
            include: {
                credentialChanges: { orderBy: { createdAt: "desc" } },
                institution: {
                    include: {
                        representatives: {
                            where: { status: client_1.UserStatus.ACTIVE },
                            select: {
                                firstName: true,
                                lastName: true,
                                signatureUrl: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });
        if (null === credentials)
            throw new exception_1.CredentialsNotFoundException(uuid);
        return credentials;
    }
    async getByDid(did) {
        const credentials = await this.prismaService.credential.findFirst({
            where: {
                OR: [
                    { did: did },
                ],
                NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
            },
        });
        if (null === credentials)
            throw new exception_1.CredentialsNotFoundException(did);
        return credentials;
    }
    async getByDidWithLastChange(did) {
        const credentials = await this.prismaService.credential.findFirst({
            where: {
                OR: [
                    { did: did },
                ],
                NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
            },
            include: {
                credentialChanges: { orderBy: { createdAt: "desc" } },
                institution: true,
            },
        });
        if (null === credentials)
            throw new exception_1.CredentialsNotFoundException(did);
        return credentials;
    }
    async getAllForStudent(user, filter) {
        if (filter && filter !== "") {
            return await this.prismaService.credential.findMany({
                where: {
                    OR: [
                        { graduatedName: { contains: filter, mode: "insensitive" } },
                        { awardingInstitution: { contains: filter, mode: "insensitive" } },
                        { qualificationName: { contains: filter, mode: "insensitive" } },
                    ],
                    AND: [
                        { studentUuid: user.uuid },
                    ],
                    NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
                },
                include: {
                    credentialChanges: { orderBy: { createdAt: "desc" } },
                    institution: true,
                },
            });
        }
        else {
            return await this.prismaService.credential.findMany({
                where: {
                    OR: [
                        { studentUuid: user.uuid },
                    ],
                    NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
                },
                include: {
                    credentialChanges: { orderBy: { createdAt: "desc" } },
                    institution: true,
                },
            });
        }
    }
    async getAllForInstitution(user, offset, limit, filter) {
        if (filter && filter !== "") {
            return await this.prismaService.credential.findMany({
                skip: offset,
                take: limit,
                where: {
                    OR: [
                        { graduatedName: { contains: filter, mode: "insensitive" } },
                        { awardingInstitution: { contains: filter, mode: "insensitive" } },
                        { qualificationName: { contains: filter, mode: "insensitive" } },
                    ],
                    AND: [
                        { institutionUuid: user.institutionUuid },
                    ],
                    NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
                },
                include: {
                    credentialChanges: { orderBy: { createdAt: "desc" } },
                    institution: true,
                },
            });
        }
        else {
            return await this.prismaService.credential.findMany({
                skip: offset,
                take: limit,
                where: {
                    OR: [
                        { institutionUuid: user.institutionUuid },
                    ],
                    NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
                },
                include: {
                    credentialChanges: { orderBy: { createdAt: "desc" } },
                    institution: true,
                },
            });
        }
    }
    async getAllNewCredentials() {
        return await this.prismaService.credential.findMany({
            take: 100,
            where: { status: client_1.CredentialStatus.NEW },
            orderBy: { createdAt: "asc" },
            include: { credentialChanges: { take: 1, orderBy: { createdAt: "desc" } } },
        });
    }
};
CredentialsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CredentialsRepository);
exports.CredentialsRepository = CredentialsRepository;
//# sourceMappingURL=credentials.repository.js.map