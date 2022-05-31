import { useEffect } from "react"

import axios from "axios"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { confirmUploadModalState, currentFileState, filenameState, filePrefixState, uploadModalState, userActionWithdrawModalState } from "../../../atoms"
import { frontUrl } from "../../../utils"
import ConfirmUploadModal from "../../UI/Modal/ConfirmUploadModal"
import FileUploadModal from "../../UI/Modal/FileUploadModal"
import UserActionWithdrawModal from "../../UI/Modal/UserActionWithdrawModal"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const InstitutionView = ({ children, institution, userData, notificationsData }) => {

   const resetCurrentFile = useResetRecoilState(currentFileState)
   const resetFilePrefix = useResetRecoilState(filePrefixState)
   const resetFileName = useResetRecoilState(filenameState)

   const openModal = useRecoilValue(uploadModalState)
   const currentFile = useRecoilValue(currentFileState)
   const filePrefix = useRecoilValue(filePrefixState)
   const fileName = useRecoilValue(filenameState)
   
   const confirmUploadModal = useRecoilValue(confirmUploadModalState)
   const withdrawModal = useRecoilValue(userActionWithdrawModalState)

   /**
    * File deletion processing.
    **/
   useEffect(() => {
      if (currentFile) {
         const removeUploadedFile = async () => {
            const data = JSON.stringify(`${filePrefix}-${fileName}`)
            await axios.post(`${frontUrl}/api/file-delete`, data, { headers: { "Content-type": "application/json" } })
         }
         removeUploadedFile()
            .then(() => {
               resetCurrentFile()
               resetFileName()
               resetFilePrefix()
            })
            .catch(error => {
               console.log(error)
            })
      }
   }, [openModal]) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div className="main__wrapper">
         <Sidebar institution={institution}/>
         <Topbar institution={institution} notificationsData={notificationsData} userData={userData}/>
         <div className="dashboard">
            {children}
         </div>
         {openModal && <FileUploadModal/>}
         {confirmUploadModal && <ConfirmUploadModal/>}
         {withdrawModal && <UserActionWithdrawModal/>}
      </div>
   )
}

export default InstitutionView