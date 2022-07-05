import { Upload, User } from "@prisma/client";
export declare class UploadRejectedEvent {
    upload: Upload;
    rejectedBy: User;
    representatives: User[];
}
