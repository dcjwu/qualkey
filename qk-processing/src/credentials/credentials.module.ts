import { Module } from "@nestjs/common";

import { CredentialsController } from "./credentials.controller";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository],
})
export class CredentialsModule {}
