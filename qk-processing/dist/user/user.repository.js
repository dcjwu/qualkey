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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async has(email) {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        return (null !== user);
    }
    async get(email) {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
            include: { institution: true },
        });
        if (null === user)
            throw new exception_1.UserNotFoundException(email);
        return user;
    }
    async getByUuid(uuid) {
        const user = await this.prisma.user.findUnique({
            where: { uuid: uuid },
            include: { institution: true },
        });
        if (null === user)
            throw new exception_1.UserNotFoundException(uuid);
        return user;
    }
    async getActiveAdmins() {
        const admins = await this.prisma.user.findMany({
            where: {
                OR: [
                    { role: client_1.Role.ADMIN },
                    { role: client_1.Role.SUPER_ADMIN },
                ],
                AND: { status: { equals: client_1.UserStatus.ACTIVE } },
            },
        });
        if (0 === admins.length) {
            throw new exception_1.LogicException("There should be at least one admin");
        }
        return admins;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map