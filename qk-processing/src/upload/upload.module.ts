import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { UploadNotifyConsumer } from "./consumer/upload-notify.consumer";
import { UploadEventListener } from "./listener/upload.event.listener";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [
    AwsModule,
    BullModule.registerQueue({ name: "upload-notify" }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    UploadEventListener,
    UploadNotifyConsumer,
  ],
})
export class UploadModule {}
