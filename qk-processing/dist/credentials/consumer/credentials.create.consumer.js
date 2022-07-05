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
exports.CredentialsCreateConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const hedera_service_1 = require("../../hedera/hedera.service");
const user_factory_1 = require("../../user/user.factory");
const user_repository_1 = require("../../user/user.repository");
const credentials_service_1 = require("../credentials.service");
const dto_1 = require("../dto");
const credentials_change_factory_1 = require("../factory/credentials-change.factory");
const credentials_factory_1 = require("../factory/credentials.factory");
const hasher_1 = require("../helper/hasher");
const credentials_change_repository_1 = require("../repository/credentials-change.repository");
let CredentialsCreateConsumer = class CredentialsCreateConsumer {
    constructor(credentialsNotifyQueue, hederaService, credentialsService, userFactory, userRepository, credentialsFactory, credentialsChangeFactory, credentialsChangeRepository) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.hederaService = hederaService;
        this.credentialsService = credentialsService;
        this.userFactory = userFactory;
        this.userRepository = userRepository;
        this.credentialsFactory = credentialsFactory;
        this.credentialsChangeFactory = credentialsChangeFactory;
        this.credentialsChangeRepository = credentialsChangeRepository;
    }
    async handleCreate(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        const dto = job.data.credentialDataDto;
        try {
            const dataHash = hasher_1.Hasher.hash(JSON.stringify(dto_1.CredentialsHashableDataDto.fromCredentialsData(dto)));
            if (await this.credentialsChangeRepository.hasHash(dataHash)) {
                common_1.Logger.warn(`CredentialsChange with hash ${dataHash} already exists ${dto.email} ${dto.graduatedName}`);
                await job.moveToCompleted();
                return;
            }
            let user;
            if (await this.userRepository.has(dto.email)) {
                common_1.Logger.debug(`User with email - ${dto.email} already exists`);
                user = await this.userRepository.get(dto.email);
            }
            else {
                common_1.Logger.debug(`User with email - ${dto.email} does not exists, creating...`);
                user = await this.userFactory.createStudent(dto.email, dto.graduatedName);
                common_1.Logger.debug(`User created - ${dto.email}`);
            }
            const credentials = await this.credentialsFactory.create(dto, user, job.data.uploadUuid);
            common_1.Logger.debug(`Credentials created - ${credentials.uuid}`);
            const credentialsChange = await this.credentialsChangeFactory.create(credentials, dataHash);
            common_1.Logger.debug(`CredentialsChange created - ${credentialsChange.id}`);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
        }
        await job.moveToCompleted();
    }
    onActive(job) {
        common_1.Logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
};
__decorate([
    (0, bull_1.Process)({ name: "create", concurrency: 1 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsCreateConsumer.prototype, "handleCreate", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CredentialsCreateConsumer.prototype, "onActive", null);
CredentialsCreateConsumer = __decorate([
    (0, bull_1.Processor)("credentials-create"),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, hedera_service_1.HederaService,
        credentials_service_1.CredentialsService,
        user_factory_1.UserFactory,
        user_repository_1.UserRepository,
        credentials_factory_1.CredentialsFactory,
        credentials_change_factory_1.CredentialsChangeFactory,
        credentials_change_repository_1.CredentialsChangeRepository])
], CredentialsCreateConsumer);
exports.CredentialsCreateConsumer = CredentialsCreateConsumer;
//# sourceMappingURL=credentials.create.consumer.js.map