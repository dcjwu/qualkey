import { User } from "@prisma/client";
export declare class UploadSucceededEvent {
    filename: string;
    uploadedBy: string;
    representatives: User[];
}
