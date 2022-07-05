"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaModule = void 0;
const common_1 = require("@nestjs/common");
const credentials_change_repository_1 = require("../credentials/repository/credentials-change.repository");
const hedera_controller_1 = require("./hedera.controller");
const hedera_create_identity_network_1 = require("./hedera.create-identity-network");
const hedera_create_smart_contract_1 = require("./hedera.create-smart-contract");
const hedera_service_1 = require("./hedera.service");
const hedera_smart_contract_watcher_1 = require("./hedera.smart-contract-watcher");
let HederaModule = class HederaModule {
};
HederaModule = __decorate([
    (0, common_1.Module)({
        providers: [
            hedera_service_1.HederaService,
            hedera_create_identity_network_1.CreateIdentityNetworkCommand,
            hedera_create_smart_contract_1.CreateSmartContractCommand,
            hedera_smart_contract_watcher_1.HederaSmartContractWatcher,
            credentials_change_repository_1.CredentialsChangeRepository,
        ],
        exports: [hedera_service_1.HederaService],
        controllers: [hedera_controller_1.HederaController],
    })
], HederaModule);
exports.HederaModule = HederaModule;
//# sourceMappingURL=hedera.module.js.map