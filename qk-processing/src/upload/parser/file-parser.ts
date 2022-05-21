import stream from "stream";

import { Injectable } from "@nestjs/common";

import { NotSupportedException } from "../../common/exception";
import { CredentialHashableDataDto } from "../../credentials/dto/credential.hashable-data.dto";
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
  public async parseUpload(stream: stream.Readable, mapping: string[], filename: string): Promise<CredentialHashableDataDto[]> {
    const extension = filename.split(".").pop();
    if ("csv" === extension) {
      return await this.csvParser.parseCsv(stream, mapping);
    }

    if ("xlsx" === extension) {
      return this.xlsxParser.parseXlsx(stream, mapping);
    }

    throw new NotSupportedException(`Document extension is not supported ${extension}`);
  }
}
