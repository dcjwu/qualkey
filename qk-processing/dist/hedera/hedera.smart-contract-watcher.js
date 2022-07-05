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
exports.HederaSmartContractWatcher = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const hedera_service_1 = require("./hedera.service");
let HederaSmartContractWatcher = class HederaSmartContractWatcher {
    constructor(prisma, hedera) {
        this.prisma = prisma;
        this.hedera = hedera;
    }
    async createSmartContractIfNeeded() {
        const smartContract = await this.prisma.smartContract.findFirst({ where: { status: client_1.SmartContractStatus.ACTIVE } });
        if (!smartContract) {
            common_1.Logger.warn("There is no ACTIVE Smart Contract, creating new one...");
            await this.hedera.createSmartContract();
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HederaSmartContractWatcher.prototype, "createSmartContractIfNeeded", null);
HederaSmartContractWatcher = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hedera_service_1.HederaService])
], HederaSmartContractWatcher);
exports.HederaSmartContractWatcher = HederaSmartContractWatcher;
//# sourceMappingURL=hedera.smart-contract-watcher.js.map