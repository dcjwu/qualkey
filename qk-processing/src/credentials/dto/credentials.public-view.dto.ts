/**
 * Data Transfer Object with all shared parameters for Credentials public view
 */
import { Credential, CredentialChange } from "@prisma/client";

export class CredentialsPublicViewDto {
  constructor(
        public did: string,
        public smartContractId: string,
        public certificateId?: string,
        public graduatedName?: string,
        public authenticatedBy?: string,
        public qualificationName?: string,
        public majors?: string,
        public minors?: string,
        public authenticatedTitle?: string,
        public awardingInstitution?: string,
        public qualificationLevel?: string,
        public awardLevel?: string,
        public studyLanguage?: string,
        public info?: string,
        public gpaFinalGrade?: string,
        public authenticatedAt?: Date,
        public studyStartedAt?: Date,
        public studyEndedAt?: Date,
        public graduatedAt?: Date,
        public expiresAt?: Date,
  ) {
  }

  static fromCredentials(credentials: Credential, credentialChange: CredentialChange, allowed: string): CredentialsPublicViewDto
  {
    const allowedArray = allowed.split(";");

    return new CredentialsPublicViewDto(
      credentials.did,
      credentialChange.smartContractId,
      allowedArray.includes("certificateId") ? credentials.certificateId : null,
      allowedArray.includes("graduatedName") ? credentials.graduatedName : null,
      allowedArray.includes("authenticatedBy") ? credentials.authenticatedBy : null,
      allowedArray.includes("qualificationName") ? credentials.qualificationName : null,
      allowedArray.includes("majors") ? credentials.majors : null,
      allowedArray.includes("minors") ? credentials.minors : null,
      allowedArray.includes("authenticatedTitle") ? credentials.authenticatedTitle : null,
      allowedArray.includes("awardingInstitution") ? credentials.awardingInstitution : null,
      allowedArray.includes("qualificationLevel") ? credentials.qualificationLevel : null,
      allowedArray.includes("awardLevel") ? credentials.awardLevel : null,
      allowedArray.includes("studyLanguage") ? credentials.studyLanguage : null,
      allowedArray.includes("info") ? credentials.info : null,
      allowedArray.includes("gpaFinalGrade") ? credentials.gpaFinalGrade : null,
      allowedArray.includes("authenticatedAt") ? credentials.authenticatedAt : null,
      allowedArray.includes("studyStartedAt") ? credentials.studyStartedAt : null,
      allowedArray.includes("studyEndedAt") ? credentials.studyEndedAt : null,
      allowedArray.includes("graduatedAt") ? credentials.graduatedAt : null,
      allowedArray.includes("expiresAt") ? credentials.expiresAt : null,
    );
  }
}