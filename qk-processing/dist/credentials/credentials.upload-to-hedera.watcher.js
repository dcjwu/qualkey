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
exports.CredentialsUploadToHederaWatcher = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const hedera_service_1 = require("../hedera/hedera.service");
const prisma_service_1 = require("../prisma/prisma.service");
const credentials_status_update_service_1 = require("./credentials.status-update.service");
const credentials_repository_1 = require("./repository/credentials.repository");
let CredentialsUploadToHederaWatcher = class CredentialsUploadToHederaWatcher {
    constructor(credentialsUploadQueue, prisma, hedera, credentialsRepository, credentialsStatusUpdateService) {
        this.credentialsUploadQueue = credentialsUploadQueue;
        this.prisma = prisma;
        this.hedera = hedera;
        this.credentialsRepository = credentialsRepository;
        this.credentialsStatusUpdateService = credentialsStatusUpdateService;
    }
    async uploadCredentialsToSmartContract() {
        const newCredentials = await this.credentialsRepository.getAllNewCredentials();
        if (0 === newCredentials.length) {
            common_1.Logger.warn("There is no NEW credentials to upload");
            return;
        }
        for (const credentials of newCredentials) {
            const credentialChange = credentials.credentialChanges[0];
            const credential = await this.credentialsStatusUpdateService.toUploadingToBlockchain(credentials);
            common_1.Logger.debug(`Dispatching credentialsUploadMessage ${credential.uuid}`);
            await this.credentialsUploadQueue.add("upload", { credential: credential, credentialChange: credentialChange });
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CredentialsUploadToHederaWatcher.prototype, "uploadCredentialsToSmartContract", null);
CredentialsUploadToHederaWatcher = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("credentials-upload")),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService,
        hedera_service_1.HederaService,
        credentials_repository_1.CredentialsRepository,
        credentials_status_update_service_1.CredentialsStatusUpdateService])
], CredentialsUploadToHederaWatcher);
exports.CredentialsUploadToHederaWatcher = CredentialsUploadToHederaWatcher;
//# sourceMappingURL=credentials.upload-to-hedera.watcher.js.map