import { Upload, User } from "@prisma/client";

export class UploadApprovedEvent {
  upload: Upload;
  representatives: User[];
}