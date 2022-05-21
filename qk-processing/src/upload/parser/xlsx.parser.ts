import stream from "stream";

import { Injectable, Logger } from "@nestjs/common";
import * as XLSX from "xlsx";

import { CredentialHashableDataDto } from "../../credentials/dto/credential.hashable-data.dto";

@Injectable()
export class XlsxParser {

  public async parseXlsx(stream: stream.Readable, mapping: string[]): Promise<CredentialHashableDataDto[]> {
    const buffers = [];
    const credentialDtoArray: CredentialHashableDataDto[] = [];

    return new Promise((resolve, reject) => {
      stream.on("data", (data) => buffers.push(data));
      stream.on("error", (err) => reject(err));
      stream.on("end", () => {
        try {
          const buffer = Buffer.concat(buffers);
          const workbook = XLSX.read(buffer);
          const sheetName: string = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: mapping });
          json.forEach(data => {

            const dto = new CredentialHashableDataDto();
            dto.certificateId = data["certificateId"];
            dto.graduatedName = data["graduatedName"];
            dto.authenticatedBy = data["authenticatedBy"];
            dto.qualificationName = data["qualificationName"];
            dto.majors = data["majors"];
            dto.minors = data["minors"];
            dto.authenticatedTitle = data["authenticatedTitle"];
            dto.awardingInstitution = data["awardingInstitution"];
            dto.qualificationLevel = data["qualificationLevel"];
            dto.awardLevel = data["awardLevel"];
            dto.studyLanguage = data["studyLanguage"];
            dto.info = data["info"];
            dto.gpaFinalGrade = data["gpaFinalGrade"];

            dto.authenticatedAt = (!data["authenticatedAt"]) ? undefined : new Date(data["authenticatedAt"]);
            dto.studyStartedAt = (!data["studyStartedAt"]) ? undefined : new Date(data["studyStartedAt"]);
            dto.studyEndedAt = (!data["studyEndedAt"]) ? undefined : new Date(data["studyEndedAt"]);
            dto.graduatedAt = (!data["graduatedAt"]) ? undefined : new Date(data["graduatedAt"]);
            dto.expiresAt = (!data["expiresAt"]) ? undefined : new Date(data["expiresAt"]);

            credentialDtoArray.push(dto);
          });
        } catch (err) {
          Logger.error(err, err.stack);
        }
        resolve(credentialDtoArray);
      });
    });
  }
}
