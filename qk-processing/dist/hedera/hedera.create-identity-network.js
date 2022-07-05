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
exports.CreateIdentityNetworkCommand = void 0;
const fs = require("fs");
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const hedera_service_1 = require("./hedera.service");
let CreateIdentityNetworkCommand = class CreateIdentityNetworkCommand {
    constructor(hederaService) {
        this.hederaService = hederaService;
    }
    async create() {
        const hin = await this.hederaService.createHcsIdentityNetwork();
        console.log(hin);
        console.log(hin.getAddressBook().getFileId().shard);
        console.log(hin.getAddressBook().getFileId().num);
        console.log(hin.getAddressBook().getFileId().realm);
        fs.writeFileSync("./files/hcs_did_network.json", JSON.stringify({
            identityNetwork: hin,
            fileIdShard: hin.getAddressBook().getFileId().shard,
            fileIdRealm: hin.getAddressBook().getFileId().realm,
            fileIdNum: hin.getAddressBook().getFileId().num,
        }, null, 2), "utf-8");
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: "create:did-id-network",
        describe: "create an HCS Identity Network ",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreateIdentityNetworkCommand.prototype, "create", null);
CreateIdentityNetworkCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hedera_service_1.HederaService])
], CreateIdentityNetworkCommand);
exports.CreateIdentityNetworkCommand = CreateIdentityNetworkCommand;
//# sourceMappingURL=hedera.create-identity-network.js.map