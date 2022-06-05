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
      allowedArray.includes("certificateId") ? credentials.certificateId : undefined,
      allowedArray.includes("graduatedName") ? credentials.graduatedName : undefined,
      allowedArray.includes("authenticatedBy") ? credentials.authenticatedBy : undefined,
      allowedArray.includes("qualificationName") ? credentials.qualificationName : undefined,
      allowedArray.includes("majors") ? credentials.majors : undefined,
      allowedArray.includes("minors") ? credentials.minors : undefined,
      allowedArray.includes("authenticatedTitle") ? credentials.authenticatedTitle : undefined,
      allowedArray.includes("awardingInstitution") ? credentials.awardingInstitution : undefined,
      allowedArray.includes("qualificationLevel") ? credentials.qualificationLevel : undefined,
      allowedArray.includes("awardLevel") ? credentials.awardLevel : undefined,
      allowedArray.includes("studyLanguage") ? credentials.studyLanguage : undefined,
      allowedArray.includes("info") ? credentials.info : undefined,
      allowedArray.includes("gpaFinalGrade") ? credentials.gpaFinalGrade : undefined,
      allowedArray.includes("authenticatedAt") ? credentials.authenticatedAt : undefined,
      allowedArray.includes("studyStartedAt") ? credentials.studyStartedAt : undefined,
      allowedArray.includes("studyEndedAt") ? credentials.studyEndedAt : undefined,
      allowedArray.includes("graduatedAt") ? credentials.graduatedAt : undefined,
      allowedArray.includes("expiresAt") ? credentials.expiresAt : undefined,
    );
  }
}