/// <reference types="node" />
import stream from "stream";
import { User } from "@prisma/client";
import { CredentialsDataDto } from "../../credentials/dto";
export declare class XlsxParser {
    parseXlsx(stream: stream.Readable, authenticatedBy: User, mapping: string[]): Promise<CredentialsDataDto[]>;
}
