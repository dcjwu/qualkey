import { useEffect } from "react"

import axios from "axios"
import getConfig from "next/config"
import { useRecoilValue } from "recoil"

import { currentFileState, filenameState, filePrefixState, uploadModalState } from "../atoms"
import Heading from "../components/UI/Heading/Heading"
import FileUploadModal from "../components/UI/Modal/FileUploadModal/FileUploadModal"
import InstitutionSidebar from "../components/UI/Sidebar/InstitutionSidebar/InstitutionSidebar"
import Topbar from "../components/UI/Topbar/Topbar"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ value, serverErrorMessage }) {
   
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
            await axios.post("api/file-delete", data, { headers: { "Content-type": "application/json" } })
         }
         removeUploadedFile()
            .then(res => {
               console.log(res)
            })
            .catch(err => {
               console.log(err)
            })
      }
   }, [openModal])

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   return (
      <div className="main__wrapper">
         <InstitutionSidebar/>
         <Topbar/>
         <div className="dashboard">
            <Heading blue h1 xxl>{value}</Heading>
         </div>
         {openModal && <FileUploadModal/>}
      </div>
   )
}

export const getServerSideProps = async ({ req }) => {
   try {
      const response = await axios.get(`${apiUrl}/credential`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data: value } = response
      return { props: { value } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}