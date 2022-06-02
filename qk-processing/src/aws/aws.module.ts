import { Module } from "@nestjs/common";

import { SettingsModule } from "../settings/settings.module";
import { AwsS3Service } from "./aws.s3.service";
import { AwsSesService } from "./aws.ses.service";

@Module({
  imports: [SettingsModule],
  providers: [AwsS3Service, AwsSesService],
  exports: [AwsS3Service, AwsSesService],
})
export class AwsModule {}
