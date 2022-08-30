import type { ICredential, ICredentialDidShare } from "@interfaces/credentials.interface"

export type CertificateType = {
   data: ICredential | ICredentialDidShare
   showQR: boolean
}