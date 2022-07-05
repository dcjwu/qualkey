import { Upload, User } from "@prisma/client";
export declare class UploadApprovedEvent {
    upload: Upload;
    representatives: User[];
    approvedBy: User;
}
