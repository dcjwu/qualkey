import { User, Upload } from "@prisma/client";
export declare class UploadSucceededEvent {
    upload: Upload;
    representatives: User[];
}
