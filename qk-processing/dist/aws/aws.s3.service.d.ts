/// <reference types="node" />
import stream from "stream";
import { ConfigService } from "@nestjs/config";
export declare class AwsS3Service {
    config: ConfigService;
    upload(file: any): Promise<string>;
    remove(filename: any): Promise<void>;
    get(filename: any): stream.Readable;
    private getS3;
}
