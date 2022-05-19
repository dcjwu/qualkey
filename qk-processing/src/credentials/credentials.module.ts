import { Module } from "@nestjs/common";

import { HederaModule } from "../hedera/hedera.module";
import { CredentialsCreateConsumer } from "./consumer/credentials-create.consumer";
import { CredentialsController } from "./credentials.controller";
import { CredentialsFactory } from "./credentials.factory";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";
import { CredentialsCreateHandler } from "./handler/credentials-create.handler";

@Module({
  imports: [HederaModule],
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    CredentialsRepository,
    CredentialsCreateHandler,
    CredentialsFactory,
    CredentialsCreateConsumer,
  ],
})
export class CredentialsModule {}
