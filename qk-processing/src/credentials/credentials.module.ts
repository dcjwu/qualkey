import { Module } from "@nestjs/common";

import { HederaModule } from "../hedera/hedera.module";
import { CredentialsController } from "./credentials.controller";
import { CredentialsFactory } from "./credentials.factory";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";
import { CredentialsEventListener } from "./listener/credentials.event.listener";

@Module({
  imports: [HederaModule],
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    CredentialsRepository,
    CredentialsFactory,
    CredentialsEventListener,
  ],
})
export class CredentialsModule {}
