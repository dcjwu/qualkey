import { Module } from "@nestjs/common";

import { CredentialsRepository } from "../credentials/repository/credentials.repository";
import { SettingsService } from "../settings/settings.service";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, CredentialsRepository, SettingsService],
})
export class PaymentModule {}
