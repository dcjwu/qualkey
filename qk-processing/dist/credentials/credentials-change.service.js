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
exports.CredentialsChangeService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const exception_1 = require("../common/exception");
const hedera_service_1 = require("../hedera/hedera.service");
const prisma_service_1 = require("../prisma/prisma.service");
const dto_1 = require("./dto");
const event_1 = require("./event");
const credentials_change_factory_1 = require("./factory/credentials-change.factory");
const hasher_1 = require("./helper/hasher");
const credentials_change_repository_1 = require("./repository/credentials-change.repository");
let CredentialsChangeService = class CredentialsChangeService {
    constructor(credentialsNotifyQueue, credentialsChangeRepository, credentialsChangeFactory, hederaService, prisma, eventEmitter) {
        this.credentialsNotifyQueue = credentialsNotifyQueue;
        this.credentialsChangeRepository = credentialsChangeRepository;
        this.credentialsChangeFactory = credentialsChangeFactory;
        this.hederaService = hederaService;
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async processCredentialChange(changedBy, credentials, changedTo, fieldName) {
        const hashableDataDto = dto_1.CredentialsHashableDataDto.fromCredentials(credentials);
        const dataHash = hasher_1.Hasher.hash(JSON.stringify(hashableDataDto));
        common_1.Logger.debug(`Checking repository hash for credentials (${credentials.uuid}), hash: ${dataHash}`);
        if (!await this.credentialsChangeRepository.hasHash(dataHash)) {
            await this.credentialsNotifyQueue.add("credentials-manipulated", { credentialsUuid: credentials.uuid });
            throw new exception_1.CredentialsDataManipulatedException(credentials.uuid);
        }
        const credentialsChange = await this.credentialsChangeRepository.getByHash(dataHash);
        const credentialsHederaInfoDto = await this.hederaService.getCredentialChangeDataFromSmartContract(credentialsChange.id, credentialsChange.smartContractId);
        common_1.Logger.debug(`Checking hedera hash for credentials (${credentials.uuid}), hash: ${dataHash}`);
        if (dataHash !== credentialsHederaInfoDto.hash) {
            await this.credentialsNotifyQueue.add("credentials-manipulated", { credentialsUuid: credentials.uuid });
            throw new exception_1.CredentialsDataManipulatedException(credentials.uuid);
        }
        const changedFrom = [];
        for (const field of fieldName) {
            changedFrom.push(credentials[field]);
        }
        for (let i = 0; i < fieldName.length; i++) {
            credentials[fieldName[i]] = changedTo[i];
        }
        const updatedCredentials = await this.prisma.credential.update({
            data: {
                certificateId: credentials.certificateId,
                graduatedName: credentials.graduatedName,
                qualificationName: credentials.qualificationName,
                majors: credentials.majors,
                minors: credentials.minors,
                awardingInstitution: credentials.awardingInstitution,
                qualificationLevel: credentials.qualificationLevel,
                awardLevel: credentials.awardLevel,
                studyLanguage: credentials.studyLanguage,
                info: credentials.info,
                gpaFinalGrade: credentials.gpaFinalGrade,
                studyStartedAt: credentials.studyStartedAt,
                studyEndedAt: credentials.studyEndedAt,
                graduatedAt: credentials.graduatedAt,
                expiresAt: credentials.expiresAt,
            },
            where: { did: credentials.did },
        });
        common_1.Logger.debug(`Credentials updated - ${credentials.uuid}`);
        const newDataHash = hasher_1.Hasher.hash(JSON.stringify(dto_1.CredentialsHashableDataDto.fromCredentials(updatedCredentials)));
        const newCredentialsChange = await this.credentialsChangeFactory.createFromUpdate(credentials, newDataHash, changedBy, changedFrom, changedTo, fieldName);
        common_1.Logger.debug(`CredentialsChange created - ${newCredentialsChange.id}`);
        await this.hederaService.writeCredentialChangeToSmartContract(newCredentialsChange);
        common_1.Logger.debug(`CredentialsChange saved to Hedera - ${newCredentialsChange.id}`);
        const credentialsChangedEvent = new event_1.CredentialsChangedEvent();
        credentialsChangedEvent.credentials = credentials;
        this.eventEmitter.emit("credentials.changed", credentialsChangedEvent);
        return newCredentialsChange;
    }
};
CredentialsChangeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("credentials-notify")),
    __metadata("design:paramtypes", [Object, credentials_change_repository_1.CredentialsChangeRepository,
        credentials_change_factory_1.CredentialsChangeFactory,
        hedera_service_1.HederaService,
        prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], CredentialsChangeService);
exports.CredentialsChangeService = CredentialsChangeService;
//# sourceMappingURL=credentials-change.service.js.map