import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AwsSesService } from "../aws/aws.ses.service";
import { CredentialsStatusUpdateService } from "../credentials/credentials.status-update.service";
import { CredentialsRepository } from "../credentials/repository/credentials.repository";
import { SettingsService } from "../settings/settings.service";
import { PaymentNotifyConsumer } from "./consumer/payment.notify.consumer";
import { PaymentEventListener } from "./listener/payment.event.listener";
import { PaymentStripeEventProcessor } from "./payment-stripe-event-processor.service";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PaymentStatusUpdateService } from "./payment.status-update.service";
import { PaymentWebhookController } from "./payment.webhook.controller";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "payment-notify",
      limiter: {
        max: 100,
        duration: 100,
        bounceBack: true,
      },
    }),
  ],
  controllers: [PaymentController, PaymentWebhookController],
  providers: [
    PaymentService,
    CredentialsRepository,
    SettingsService,
    PaymentStripeEventProcessor,
    PaymentStatusUpdateService,
    PaymentEventListener,
    AwsSesService,
    CredentialsStatusUpdateService,
    PaymentNotifyConsumer,
  ],
})
export class PaymentModule {}
