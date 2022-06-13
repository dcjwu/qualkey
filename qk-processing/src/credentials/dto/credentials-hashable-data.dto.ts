import { Credential } from "@prisma/client";

import { CredentialsDataDto } from "./credentials-data.dto";

/**
 * Data Transfer Object with all hashable parameters for CredentialsChange
 */
export class CredentialsHashableDataDto {
  institutionUuid?: string;

  certificateId?: string;
  graduatedName?: string;
  qualificationName?: string;
  majors?: string;
  minors?: string;
  awardingInstitution?: string;
  qualificationLevel?: string;
  awardLevel?: string;
  studyLanguage?: string;
  info?: string;
  gpaFinalGrade?: string;

  studyStartedAt?: Date;
  studyEndedAt?: Date;
  graduatedAt?: Date;
  expiresAt?: Date;

  static fromCredentials(credentials: Credential): CredentialsHashableDataDto {
    const dto = new CredentialsHashableDataDto();
    dto.institutionUuid = credentials.institutionUuid ?? undefined;
    dto.certificateId = credentials.certificateId ?? undefined;
    dto.graduatedName = credentials.graduatedName ?? undefined;
    dto.qualificationName = credentials.qualificationName ?? undefined;
    dto.majors = credentials.majors ?? undefined;
    dto.minors = credentials.minors ?? undefined;
    dto.awardingInstitution = credentials.awardingInstitution ?? undefined;
    dto.qualificationLevel = credentials.qualificationLevel ?? undefined;
    dto.awardLevel = credentials.awardLevel ?? undefined;
    dto.studyLanguage = credentials.studyLanguage ?? undefined;
    dto.info = credentials.info ?? undefined;
    dto.gpaFinalGrade = credentials.gpaFinalGrade ?? undefined;

    dto.studyStartedAt = credentials.studyStartedAt ?? undefined;
    dto.studyEndedAt = credentials.studyEndedAt ?? undefined;
    dto.graduatedAt = credentials.graduatedAt ?? undefined;
    dto.expiresAt = credentials.expiresAt ?? undefined;

    return dto;
  }

  static fromCredentialsData(credentialsData: CredentialsDataDto): CredentialsHashableDataDto {
    const dto = new CredentialsHashableDataDto();
    dto.institutionUuid = credentialsData.institutionUuid ?? undefined;
    dto.certificateId = credentialsData.certificateId ?? undefined;
    dto.graduatedName = credentialsData.graduatedName ?? undefined;
    dto.qualificationName = credentialsData.qualificationName ?? undefined;
    dto.majors = credentialsData.majors ?? undefined;
    dto.minors = credentialsData.minors ?? undefined;
    dto.awardingInstitution = credentialsData.awardingInstitution ?? undefined;
    dto.qualificationLevel = credentialsData.qualificationLevel ?? undefined;
    dto.awardLevel = credentialsData.awardLevel ?? undefined;
    dto.studyLanguage = credentialsData.studyLanguage ?? undefined;
    dto.info = credentialsData.info ?? undefined;
    dto.gpaFinalGrade = credentialsData.gpaFinalGrade ?? undefined;

    dto.studyStartedAt = credentialsData.studyStartedAt ?? undefined;
    dto.studyEndedAt = credentialsData.studyEndedAt ?? undefined;
    dto.graduatedAt = credentialsData.graduatedAt ?? undefined;
    dto.expiresAt = credentialsData.expiresAt ?? undefined;

    return dto;
  }
}