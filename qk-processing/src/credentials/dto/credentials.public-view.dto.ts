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

  static fromCredentials(credentials: Credential, credentialChange: CredentialChange, allowed: string[]): CredentialsPublicViewDto
  {
    return new CredentialsPublicViewDto(
      credentials.did,
      credentialChange.smartContractId,
      allowed.includes("certificateId") ? credentials.certificateId : undefined,
      allowed.includes("graduatedName") ? credentials.graduatedName : undefined,
      allowed.includes("qualificationName") ? credentials.qualificationName : undefined,
      allowed.includes("majors") ? credentials.majors : undefined,
      allowed.includes("minors") ? credentials.minors : undefined,
      allowed.includes("awardingInstitution") ? credentials.awardingInstitution : undefined,
      allowed.includes("qualificationLevel") ? credentials.qualificationLevel : undefined,
      allowed.includes("awardLevel") ? credentials.awardLevel : undefined,
      allowed.includes("studyLanguage") ? credentials.studyLanguage : undefined,
      allowed.includes("info") ? credentials.info : undefined,
      allowed.includes("gpaFinalGrade") ? credentials.gpaFinalGrade : undefined,
      allowed.includes("authenticatedBy") ? credentials.authenticatedBy : undefined,
      allowed.includes("authenticatedTitle") ? credentials.authenticatedTitle : undefined,
      allowed.includes("authenticatedAt") ? credentials.authenticatedAt : undefined,
      allowed.includes("studyStartedAt") ? credentials.studyStartedAt : undefined,
      allowed.includes("studyEndedAt") ? credentials.studyEndedAt : undefined,
      allowed.includes("graduatedAt") ? credentials.graduatedAt : undefined,
      allowed.includes("expiresAt") ? credentials.expiresAt : undefined,
    );
  }
}