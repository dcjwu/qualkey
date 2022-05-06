import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { UploadSucceededEvent, UploadFailedEvent } from "../event";

@Injectable()
export class UploadEventListener {
    @OnEvent("upload.failed")
  handleUploadFailedEvent(event: UploadFailedEvent): void {
    console.log(event);
  }

    @OnEvent("upload.succeeded")
    handleUploadSucceededEvent(event: UploadSucceededEvent): void {
      console.log(event);
    }
}