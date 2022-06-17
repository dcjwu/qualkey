/**
 * Data Transfer Object with all shared parameters for Credentials public view
 */
export class CredentialsPublicViewDto {
  constructor(
        public did: string,
        public smartContractId: string,
        public certificateId?: string,

        public graduatedName?: string,
        public qualificationName?: string,
        public majors?: string,
        public minors?: string,
        public awardingInstitution?: string,
        public qualificationLevel?: string,
        public awardLevel?: string,
        public studyLanguage?: string,
        public info?: string,
        public gpaFinalGrade?: string,
        public studyStartedAt?: Date,
        public studyEndedAt?: Date,
        public graduatedAt?: Date,

        public authenticatedBy?: string,
        public authenticatedTitle?: string,
        public authenticatedAt?: Date,
        public authenticatedBySignatureUrl?: string,

        public institutionLogoUrl?: string,
        public institutionStampUrl?: string,
  ) {
  }
}