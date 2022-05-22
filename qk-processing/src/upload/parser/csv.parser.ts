import stream from "stream";

import { Injectable, Logger } from "@nestjs/common";
import * as csv from "csv-parser";

import { CredentialHashableDataDto } from "../../credentials/dto/credential.hashable-data.dto";

@Injectable()
export class CsvParser {

  public async parseCsv(stream: stream.Readable, mapping: string[]): Promise<CredentialHashableDataDto[]> {
    const credentialDtoArray: CredentialHashableDataDto[] = [];

    return new Promise((resolve, reject) => {
      stream.pipe(csv({
        headers: mapping,
        skipLines: 1,
      }))
        .on("data", function (data) {
          try {
            const dto = new CredentialHashableDataDto();
            dto.email = data.email;
            dto.certificateId = data.certificateId;
            dto.graduatedName = data.graduatedName;
            dto.authenticatedBy = data.authenticatedBy;
            dto.qualificationName = data.qualificationName;
            dto.majors = data.majors;
            dto.minors = data.minors;
            dto.authenticatedTitle = data.authenticatedTitle;
            dto.awardingInstitution = data.awardingInstitution;
            dto.qualificationLevel = data.qualificationLevel;
            dto.awardLevel = data.awardLevel;
            dto.studyLanguage = data.studyLanguage;
            dto.info = data.info;
            dto.gpaFinalGrade = data.gpaFinalGrade;

            dto.authenticatedAt = (!data.authenticatedAt) ? undefined : new Date(data.authenticatedAt);
            dto.studyStartedAt = (!data.studyStartedAt) ? undefined : new Date(data.studyStartedAt);
            dto.studyEndedAt = (!data.studyEndedAt) ? undefined : new Date(data.studyEndedAt);
            dto.graduatedAt = (!data.graduatedAt) ? undefined : new Date(data.graduatedAt);
            dto.expiresAt = (!data.expiresAt) ? undefined : new Date(data.expiresAt);

            credentialDtoArray.push(dto);
          } catch (err) {
            Logger.error(err, err.stack);
          }
        })
        .on("error", (err) => reject(err))
        .on("end", function () {
          resolve(credentialDtoArray);
        });
    });
  }
}
