import { Module } from "@nestjs/common";

import { HederaModule } from "../hedera/hedera.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { CredentialsCreateConsumer } from "./consumer/credentials.create.consumer";
import { CredentialsChangeFactory } from "./credentials-change.factory";
import { CredentialsChangeRepository } from "./credentials-change.repository";
import { CredentialsController } from "./credentials.controller";
import { CredentialsFactory } from "./credentials.factory";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";

@Module({
  imports: [
    HederaModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    CredentialsRepository,
    CredentialsChangeRepository,
    CredentialsFactory,
    CredentialsChangeFactory,
    PrismaService,
    CredentialsCreateConsumer,
  ],
})
export class CredentialsModule {}
