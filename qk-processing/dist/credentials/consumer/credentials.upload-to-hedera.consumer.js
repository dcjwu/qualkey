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
exports.CredentialsUploadToHederaConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const hedera_service_1 = require("../../hedera/hedera.service");
const user_repository_1 = require("../../user/user.repository");
const credentials_service_1 = require("../credentials.service");
const credentials_status_update_service_1 = require("../credentials.status-update.service");
let CredentialsUploadToHederaConsumer = class CredentialsUploadToHederaConsumer {
    constructor(credentialsNotifyQueue, hederaService, credentialsService, userRepository, credentialsStatusUpdateService) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.hederaService = hederaService;
        this.credentialsService = credentialsService;
        this.userRepository = userRepository;
        this.credentialsStatusUpdateService = credentialsStatusUpdateService;
    }
    async handleUpload(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        try {
            const credential = job.data.credential;
            const credentialChange = job.data.credentialChange;
            if (credential.status !== client_1.CredentialStatus.UPLOADING_TO_BLOCKCHAIN) {
                throw new common_1.PreconditionFailedException(`Wrong status, unable to upload to hedera credentials: ${credential.uuid}`);
            }
            await this.hederaService.writeCredentialChangeToSmartContract(credentialChange);
            common_1.Logger.debug(`CredentialChange saved to smart contract - ${credentialChange.id}`);
            await this.credentialsStatusUpdateService.toUploadedToBlockchain(credential);
            const student = await this.userRepository.getByUuid(credential.studentUuid);
            await this.credentialsNotifyQueue.add("credentials-uploaded", { recipientEmail: student.email });
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
        }
        await job.moveToCompleted();
    }
};
__decorate([
    (0, bull_1.Process)({ name: "upload", concurrency: 1 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsUploadToHederaConsumer.prototype, "handleUpload", null);
CredentialsUploadToHederaConsumer = __decorate([
    (0, bull_1.Processor)("credentials-upload"),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, hedera_service_1.HederaService,
        credentials_service_1.CredentialsService,
        user_repository_1.UserRepository,
        credentials_status_update_service_1.CredentialsStatusUpdateService])
], CredentialsUploadToHederaConsumer);
exports.CredentialsUploadToHederaConsumer = CredentialsUploadToHederaConsumer;
//# sourceMappingURL=credentials.upload-to-hedera.consumer.js.map