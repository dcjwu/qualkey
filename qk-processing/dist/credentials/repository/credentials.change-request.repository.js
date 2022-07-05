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
exports.CredentialsChangeRequestRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let CredentialsChangeRequestRepository = class CredentialsChangeRequestRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async hasActiveByCredentialsUuid(credentialUuid) {
        const credentialChangeRequest = await this.prisma.credentialChangeRequest.findFirst({
            where: {
                credentialUuid: credentialUuid,
                status: client_1.CredentialChangeRequestStatus.PENDING,
            },
        });
        return (null !== credentialChangeRequest);
    }
    async getByUuid(uuid) {
        const credentialChangeRequest = await this.prisma.credentialChangeRequest.findUnique({ where: { uuid: uuid } });
        if (null === credentialChangeRequest) {
            throw new common_1.NotFoundException(`There is no such CredentialsChangeRequest: ${uuid}`);
        }
        return credentialChangeRequest;
    }
};
CredentialsChangeRequestRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CredentialsChangeRequestRepository);
exports.CredentialsChangeRequestRepository = CredentialsChangeRequestRepository;
//# sourceMappingURL=credentials.change-request.repository.js.map