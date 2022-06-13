import stream from "stream";

import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { NotSupportedException } from "../../common/exception";
import { CredentialsDataDto } from "../../credentials/dto";
import { CsvParser } from "./csv.parser";
import { XlsxParser } from "./xlsx.parser";

@Injectable()
export class FileParser {
  constructor(
        private csvParser: CsvParser,
        private xlsxParser: XlsxParser,
  ) {
  }

  /**
     * Function to parse upload data from the file into array of CredentialsData
     */
  public async parseUpload(stream: stream.Readable, authenticatedBy: User, mapping: string[], filename: string): Promise<CredentialsDataDto[]> {
    const extension = filename.split(".").pop();
    if ("csv" === extension) {
      return await this.csvParser.parseCsv(stream, authenticatedBy, mapping);
    }

    if ("xlsx" === extension) {
      return this.xlsxParser.parseXlsx(stream, authenticatedBy, mapping);
    }

    throw new NotSupportedException(`Document extension is not supported ${extension}`);
  }
}
