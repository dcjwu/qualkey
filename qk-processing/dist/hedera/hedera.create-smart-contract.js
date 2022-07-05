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
exports.CreateSmartContractCommand = void 0;
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const hedera_service_1 = require("./hedera.service");
let CreateSmartContractCommand = class CreateSmartContractCommand {
    constructor(hederaService) {
        this.hederaService = hederaService;
    }
    async create() {
        const sc = await this.hederaService.createSmartContract();
        console.log(sc);
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: "create:sc",
        describe: "create a Smart Contract",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreateSmartContractCommand.prototype, "create", null);
CreateSmartContractCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hedera_service_1.HederaService])
], CreateSmartContractCommand);
exports.CreateSmartContractCommand = CreateSmartContractCommand;
//# sourceMappingURL=hedera.create-smart-contract.js.map