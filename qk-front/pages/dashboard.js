import axios from "axios"
import getConfig from "next/config"
import { useRecoilValue } from "recoil"

import { uploadModalState } from "../atoms"
import Heading from "../components/UI/Heading/Heading"
import FileUploadModal from "../components/UI/Modal/FileUploadModal/FileUploadModal"
import InstitutionSidebar from "../components/UI/Sidebar/InstitutionSidebar/InstitutionSidebar"
import Topbar from "../components/UI/Topbar/Topbar"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ value, serverErrorMessage }) {
   
   const openModal = useRecoilValue(uploadModalState)

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