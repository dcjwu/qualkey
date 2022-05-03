import axios from "axios"
import getConfig from "next/config"

import Heading from "../components/UI/Heading/Heading"
import Sidebar from "../components/UI/Sidebar/Sidebar"
import Topbar from "../components/UI/Topbar/Topbar"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ value, serverErrorMessage }) {

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   return (
      <>
         <Sidebar/>
         <Topbar/>
         <div className="dashboard">
            <Heading blue h1 xxl>{value}</Heading>
         </div>
      </>
   )
}

export const getServerSideProps = async ({ req }) => {
   console.log(req.headers.cookie)
   try {
      const response = await axios.get(`${apiUrl}/credentials`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data: value } = response
      return { props: { value } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}