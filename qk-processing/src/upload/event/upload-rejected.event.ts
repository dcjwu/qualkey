import { Upload } from "@prisma/client";

export class UploadRejectedEvent {
  upload: Upload;
  rejectedBy: string;
}