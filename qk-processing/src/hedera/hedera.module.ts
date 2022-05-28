import { Module } from "@nestjs/common";

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
  ],
  exports: [HederaService], 
})
export class HederaModule {}
