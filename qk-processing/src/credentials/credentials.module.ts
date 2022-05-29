import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { HederaModule } from "../hedera/hedera.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { CredentialsNotifyConsumer } from "./consumer/credentials-notify.consumer";
import { CredentialsCreateConsumer } from "./consumer/credentials.create.consumer";
import { CredentialsChangeService } from "./credentials-change.service";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import { CredentialsChangeFactory } from "./factory/credentials-change.factory";
import { CredentialsWithdrawalRequestFactory } from "./factory/credentials-withdrawal-request.factory";
import { CredentialsFactory } from "./factory/credentials.factory";
import { CredentialsEventListener } from "./listener/credentials.event.listener";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
import { CredentialsWithdrawalRequestRepository } from "./repository/credentials.withdrawal-request.repository";

@Module({
  imports: [
    HederaModule,
    PrismaModule,
    UserModule,
    AwsModule,
    BullModule.registerQueue({
      name: "credentials-notify",
      limiter: {
        max: 1,
        duration: 100,
        bounceBack: true,
      },
    }),
  ],
  controllers: [CredentialsController],
  exports: [CredentialsService, CredentialsChangeService],
  providers: [
    CredentialsService,
    CredentialsRepository,
    CredentialsChangeRepository,
    CredentialsFactory,
    CredentialsChangeFactory,
    PrismaService,
    CredentialsCreateConsumer,
    CredentialsChangeService,
    CredentialsEventListener,
    CredentialsNotifyConsumer,
    CredentialsWithdrawalRequestRepository,
    CredentialsWithdrawalRequestFactory,
  ],
})
export class CredentialsModule {}
