import type { ServerErrorMessageType } from "@customTypes/common"
import type { ICredentialSharePage } from "@interfaces/credentials.interface"
import type { IUserData } from "@interfaces/user.interface"

export type DidPublicPageType = {
   userData: IUserData
   shareData: ICredentialSharePage
   shareId: string
   serverErrorMessage: ServerErrorMessageType
}