/// <reference types="node" />
import stream from "stream";
import { User } from "@prisma/client";
import { CredentialsDataDto } from "../../credentials/dto";
export declare class CsvParser {
    parseCsv(stream: stream.Readable, authenticatedBy: User, mapping: string[]): Promise<CredentialsDataDto[]>;
}
