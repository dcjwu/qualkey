import { useEffect } from "react"

import axios from "axios"
import { useRecoilValue } from "recoil"

import { currentFileState, filenameState, filePrefixState, uploadModalState } from "../../../atoms"
import { frontUrl } from "../../../utils"
import FileUploadModal from "../../UI/Modal/FileUploadModal/FileUploadModal"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const InstitutionView = ({ children, institution }) => {

   const openModal = useRecoilValue(uploadModalState)
   const currentFile = useRecoilValue(currentFileState)
   const filePrefix = useRecoilValue(filePrefixState)
   const fileName = useRecoilValue(filenameState)

   /**
    * File deletion processing.
    * @desc When modal is closed deletes just uploaded file from /uploads folder.
    * @returns Logs success response.
    * @throws Logs error response.
    **/
   useEffect(() => {
      if (currentFile) {
         const removeUploadedFile = async () => {
            const data = JSON.stringify(`${filePrefix}-${fileName}`)
            await axios.post(`${frontUrl}/api/file-delete`, data, { headers: { "Content-type": "application/json" } })
         }
         removeUploadedFile()
            .then(response => {
               console.log(response)
            })
            .catch(error => {
               console.log(error)
            })
      }
   }, [openModal])

   return (
      <div className="main__wrapper">
         <Sidebar institution={institution}/>
         <Topbar institution={institution}/>
         <div className="dashboard">
            {children}
         </div>
         {openModal && <FileUploadModal/>}
      </div>
   )
}

export default InstitutionView