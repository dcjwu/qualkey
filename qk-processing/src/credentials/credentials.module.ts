import { Module } from "@nestjs/common";

import { CredentialsCreateConsumer } from "./consumer/credentials-create.consumer";
import { CredentialsController } from "./credentials.controller";
import { CredentialsFactory } from "./credentials.factory";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";
import { CredentialsCreateHandler } from "./handler/credentials-create.handler";

@Module({
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
