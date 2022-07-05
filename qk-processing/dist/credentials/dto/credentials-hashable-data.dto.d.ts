import { Credential } from "@prisma/client";
import { CredentialsDataDto } from "./credentials-data.dto";
export declare class CredentialsHashableDataDto {
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
    static fromCredentials(credentials: Credential): CredentialsHashableDataDto;
    static fromCredentialsData(credentialsData: CredentialsDataDto): CredentialsHashableDataDto;
}
