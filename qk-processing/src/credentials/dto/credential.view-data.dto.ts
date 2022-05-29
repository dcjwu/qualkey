import { Credential, CredentialChange } from "@prisma/client";

/**
 * Data Transfer Object with all hashable parameters for CredentialsChange
 */
export class CredentialViewDataDto {
  credentials: Credential;
  credentialsChange: CredentialChange;

  certificateId?: string;
  graduatedName?: string;
  authenticatedBy?: string;
  qualificationName?: string;
  majors?: string;
  minors?: string;
  authenticatedTitle?: string;
  awardingInstitution?: string;
  qualificationLevel?: string;
  awardLevel?: string;
  studyLanguage?: string;
  info?: string;
  gpaFinalGrade?: string;

  authenticatedAt?: Date;
  studyStartedAt?: Date;
  studyEndedAt?: Date;
  graduatedAt?: Date;
  expiresAt?: Date;
}