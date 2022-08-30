import type { IInstitution } from "@interfaces/institution.interface"

export type UploadModalType = {
   isOpen: boolean
   handleCloseModal: () => void
   institutionData?: IInstitution
}