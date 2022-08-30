import type { ServerErrorMessageType } from "@customTypes/common"
import type { ICredentialDidShare } from "@interfaces/credentials.interface"
import type { IUserData } from "@interfaces/user.interface"

export type DidPublicPageType = {
   userData: IUserData
   shareData: ICredentialDidShare
   shareId: string
   serverErrorMessage: ServerErrorMessageType
}