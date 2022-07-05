/// <reference types="node" />
import stream from "stream";
import { User } from "@prisma/client";
import { CredentialsDataDto } from "../../credentials/dto";
import { CsvParser } from "./csv.parser";
import { XlsxParser } from "./xlsx.parser";
export declare class FileParser {
    private csvParser;
    private xlsxParser;
    constructor(csvParser: CsvParser, xlsxParser: XlsxParser);
    parseUpload(stream: stream.Readable, authenticatedBy: User, mapping: string[], filename: string): Promise<CredentialsDataDto[]>;
}
