import { Module } from "@nestjs/common";

import { CredentialsController } from "./credentials.controller";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";
import { CredentialsCreateHandler } from "./handler/credentials-create.handler";
import { CredentialsFactory } from "./credentials.factory";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, CredentialsCreateHandler, CredentialsFactory],
})
export class CredentialsModule {}
