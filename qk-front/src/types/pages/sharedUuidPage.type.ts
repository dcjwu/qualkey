import type { ServerErrorMessageType } from "@customTypes/common"
import type { ICredentialShare } from "@interfaces/credentials.interface"
import type { IUserData } from "@interfaces/user.interface"

export type SharedUuidPageType = {
   serverErrorMessage: ServerErrorMessageType
   userData: IUserData
   shareData?: ICredentialShare[]
   shareId: string
}
