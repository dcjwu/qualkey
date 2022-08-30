import { IUserAction } from "@interfaces/user.interface"

export enum FileTypeEnum  {
   TEXT_CSV = "text/csv",
   APP_CSV = "application/csv",
   APP_XLS = "application/vnd.ms-excel",
   APP_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

export type UserActionReviewUploadType = {
   data: IUserAction | null
   handleCloseModal:  () => void
   isOpen: boolean
}