export declare class CredentialsPublicViewDto {
    did: string;
    smartContractId: string;
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
    authenticatedBy?: string;
    authenticatedTitle?: string;
    authenticatedAt?: Date;
    authenticatedBySignatureUrl?: string;
    institutionLogoUrl?: string;
    institutionStampUrl?: string;
    constructor(did: string, smartContractId: string, certificateId?: string, graduatedName?: string, qualificationName?: string, majors?: string, minors?: string, awardingInstitution?: string, qualificationLevel?: string, awardLevel?: string, studyLanguage?: string, info?: string, gpaFinalGrade?: string, studyStartedAt?: Date, studyEndedAt?: Date, graduatedAt?: Date, authenticatedBy?: string, authenticatedTitle?: string, authenticatedAt?: Date, authenticatedBySignatureUrl?: string, institutionLogoUrl?: string, institutionStampUrl?: string);
}
