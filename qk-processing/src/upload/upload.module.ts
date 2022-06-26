import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserRepository } from "../user/user.repository";
import { UploadNotifyConsumer } from "./consumer/upload-notify.consumer";
import { UploadEventListener } from "./listener/upload.event.listener";
import { CsvParser } from "./parser/csv.parser";
import { FileParser } from "./parser/file-parser";
import { XlsxParser } from "./parser/xlsx.parser";
import { UploadRepository } from "./repository/upload.repository";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [
    AwsModule,
    BullModule.registerQueue({
      name: "upload-notify",
      limiter: {
        max: 1000,
        duration: 1000,
      },
      defaultJobOptions: {
        attempts: 10,
        backoff: {
          type: "exponential",
          delay: 100000,
        },
      },
      settings: { retryProcessDelay: 300 },
    }),
    BullModule.registerQueue({
      name: "credentials-create",
      limiter: {
        max: 1000,
        duration: 1000,
      },
      defaultJobOptions: {
        attempts: 10,
        backoff: {
          type: "exponential",
          delay: 100000,
        },
      },
      settings: { retryProcessDelay: 300 },
    }),
  ],
  controllers: [UploadController],
  exports: [UploadService, UploadRepository],
  providers: [
    UploadService,
    UploadEventListener,
    UploadNotifyConsumer,
    FileParser,
    XlsxParser,
    CsvParser,
    PrismaService,
    UserRepository,
    UploadRepository,
  ],
})
export class UploadModule {}
