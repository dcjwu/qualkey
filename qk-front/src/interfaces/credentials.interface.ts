import type { IInstitution } from "@interfaces/institution.interface"

export enum CredentialStatusEnum {
   NEW = "NEW",
   UPLOADING_TO_BLOCKCHAIN = "UPLOADING_TO_BLOCKCHAIN",
   UPLOADED_TO_BLOCKCHAIN = "UPLOADED_TO_BLOCKCHAIN",
   ACTIVATED = "ACTIVATED",
   WITHDRAWN = "WITHDRAWN",
   EXPIRED = "EXPIRED",
}

export interface ICredential {
   uuid: string
   status: CredentialStatusEnum
   studentUuid: string
   institution: IInstitution
   institutionUuid: string
   did?: string
   certificateId?: string
   graduatedName?: string
   qualificationName?: string
   majors?: string
   minors?: string
   awardingInstitution?: string
   qualificationLevel?: string
   awardLevel?: string
   studyLanguage?: string
   info?: string
   gpaFinalGrade?: string
   studyStartedAt?: Date
   studyEndedAt?: Date
   graduatedAt?: Date
   expiresAt?: Date

   credentialChanges: ICredentialChange[]

   authenticatedAt?: Date
   authenticatedBy?: string
   authenticatedTitle?: string

   createdAt: Date
   updatedAt: Date
}

export interface ICredentialShare {
   uuid: string
   credentialQualificationNames: string[]
   credentialUuids: string[]
   recipientEmails: string[]
   sharedBy: string
   sharedFields: string[]
   temporaryPassword: string
   expiresAt: Date
   createdAt: Date
}

export interface ICredentialChange {
   id: number
   credentialUuid: string
   credentialDid: string
   changedByUuid?: string
   changedFrom: string[]
   changedTo: string[]
   fieldName: string[]
   createdAt: Date
   hash: string
   smartContractId?: string
}

export interface ICredentialDidShare {
   authenticatedAt: Date
   authenticatedBy: string
   authenticatedBySignatureUrl: string
   authenticatedTitle: string
   awardLevel: string
   awardingInstitution: string
   did: string
   expiresAt: Date
   gpaFinalGrade?: string
   graduatedAt: Date
   graduatedName: string
   info?: string
   institutionLogoUrl?: string
   institutionStampUrl?: string
   qualificationLevel: string
   qualificationName: string
   smartContractId: string
   studyEndedAt: Date
   studyLanguage: string
   studyStartedAt: Date
}