import { User } from "@prisma/client";

export class UploadSucceededEvent {
  filename: string;
  uploadedBy: string;
  representatives: User[];
}