import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"
import { useRouter } from "next/router"

import InstitutionDashboard from "../../components/Institution/InstitutionDashboard/InstitutionDashboard"
import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import StudentDashboard from "../../components/Student/StudentDashboard/StudentDashboard"
import StudentView from "../../components/Student/StudentView/StudentView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "./../_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ data, serverErrorMessage }) {
   
   const { push } = useRouter()

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role } = data

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>University Dashboard | QualKey</title>
         </Head>
         <InstitutionView institution>
            <Heading blue h1 xxl>University Dashboard</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionDashboard/>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>Credentials Dashboard | QualKey</title>
         </Head>
         <StudentView>
            <Heading blue h1 xxl>Credentials Dashboard</Heading>
            <Text large>view, share and manage your credentials</Text>
            <StudentDashboard/>
         </StudentView>
      </>
   )

   else push("/")
}

export const getServerSideProps = async ({ req }) => {
   try {
      const response = await axios.get(`${apiUrl}/credential`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      return { props: { data } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}