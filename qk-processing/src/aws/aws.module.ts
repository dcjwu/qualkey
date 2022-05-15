import { Module } from "@nestjs/common";

import { AwsS3Service } from "./aws.s3.service";
import { AwsSesService } from "./aws.ses.service";

@Module({
  providers: [AwsS3Service, AwsSesService],
  exports: [AwsS3Service, AwsSesService],
})
export class AwsModule {}
