import { Module } from "@nestjs/common";

import { CredentialsChangeRepository } from "../credentials/repository/credentials-change.repository";
import { HederaController } from "./hedera.controller";
import { CreateIdentityNetworkCommand } from "./hedera.create-identity-network";
import { CreateSmartContractCommand } from "./hedera.create-smart-contract";
import { HederaService } from "./hedera.service";
import { HederaSmartContractWatcher } from "./hedera.smart-contract-watcher";

@Module({
  providers: [
    HederaService,
    CreateIdentityNetworkCommand,
    CreateSmartContractCommand,
    HederaSmartContractWatcher,
    CredentialsChangeRepository,
  ],
  exports: [HederaService],
  controllers: [HederaController], 
})
export class HederaModule {}
