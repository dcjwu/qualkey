import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { UploadNotifyConsumer } from "./consumer/upload-notify.consumer";
import { UploadEventListener } from "./listener/upload.event.listener";
import { CsvParser } from "./parser/csv.parser";
import { FileParser } from "./parser/file-parser";
import { XlsxParser } from "./parser/xlsx.parser";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [
    AwsModule,
    BullModule.registerQueue({
      name: "upload-notify",
      limiter: {
        max: 1,
        duration: 100,
        bounceBack: true,
      },
    }),
    BullModule.registerQueue({
      name: "credentials-create",
      limiter: {
        max: 1,
        duration: 1000,
        bounceBack: true,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    UploadEventListener,
    UploadNotifyConsumer,
    FileParser,
    XlsxParser,
    CsvParser,
  ],
})
export class UploadModule {}
