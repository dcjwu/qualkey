import { Module } from "@nestjs/common";

import { UploadEventListener } from "./listener/upload.event.listener";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadEventListener],
})
export class UploadModule {}
