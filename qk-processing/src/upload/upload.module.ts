import { Module } from "@nestjs/common";

import { UploadEventListener } from "./listener/upload.event.listener";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { AwsModule } from "../aws/aws.module";

@Module({
  imports: [AwsModule],
  controllers: [UploadController],
  providers: [UploadService, UploadEventListener],
})
export class UploadModule {}
