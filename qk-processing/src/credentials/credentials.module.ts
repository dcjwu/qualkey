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
import { CredentialsShareService } from "./credentials-share.service";
import { CredentialsChangeRequestService } from "./credentials.change-request.service";
import { CredentialsController } from "./credentials.controller";
import { CredentialsPublicController } from "./credentials.public.controller";
import { CredentialsService } from "./credentials.service";
import { CredentialsStatusUpdateService } from "./credentials.status-update.service";
import { CredentialsChangeFactory } from "./factory/credentials-change.factory";
import { CredentialsShareFactory } from "./factory/credentials-share.factory";
import { CredentialsWithdrawalRequestFactory } from "./factory/credentials-withdrawal-request.factory";
import { CredentialsFactory } from "./factory/credentials.factory";
import { CredentialsEventListener } from "./listener/credentials.event.listener";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsShareRepository } from "./repository/credentials-share.repository";
import { CredentialsChangeRequestRepository } from "./repository/credentials.change-request.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
import { CredentialsWithdrawalRequestRepository } from "./repository/credentials.withdrawal-request.repository";
import { IsEmailArrayConstraint } from "./validator/is-email-array.constraint";

@Module({
  imports: [
    HederaModule,
    PrismaModule,
    UserModule,
    AwsModule,
    BullModule.registerQueue({
      name: "credentials-notify",
      limiter: {
        max: 100,
        duration: 100,
        bounceBack: true,
      },
    }),
  ],
  controllers: [CredentialsController, CredentialsPublicController],
  exports: [
    CredentialsService,
    CredentialsChangeService,
    CredentialsChangeRequestService,
    CredentialsChangeRepository,
    CredentialsStatusUpdateService,
  ],
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
    CredentialsShareRepository,
    IsEmailArrayConstraint,
    CredentialsShareService,
    CredentialsShareFactory,
    CredentialsStatusUpdateService,
    CredentialsChangeRequestRepository,
    CredentialsChangeRequestService,
  ],
})
export class CredentialsModule {}
