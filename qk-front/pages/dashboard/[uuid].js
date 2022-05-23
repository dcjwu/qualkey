import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"
import { useRecoilValue } from "recoil"

import { showEditCredentialsState } from "../../atoms"
import CredentialsInfo from "../../components/CredentialsInfo/CredentialsInfo"
import InstitutionViewCredentialsItem from "../../components/DashboardItem/InstitutionViewCredentialsItem"
import StudentViewCredentialsItem from "../../components/DashboardItem/StudentViewCredentialsItem"
import InstitutionEditCredentials from "../../components/Institution/InstitutionEditCredentials/InstitutionEditCredentials"
import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import StudentView from "../../components/Student/StudentView/StudentView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "../_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function CredentialsView({ data, serverErrorMessage }) {

   const showEditCredentials = useRecoilValue(showEditCredentialsState)

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role, data: credentialsData } = data[0]

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <InstitutionView>
            <Heading blue h1>View Credentials</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionViewCredentialsItem data={credentialsData}/>
            {!showEditCredentials
               ? <CredentialsInfo data={credentialsData}/>
               : <InstitutionEditCredentials data={credentialsData}/>}
            <div className="withdraw__button">
               <Text grey>- Withdraw Credentials -</Text>
            </div>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <StudentView>
            <Heading blue h1>View Credentials</Heading>
            <Text large>view, share and manage your credentials</Text>
            <StudentViewCredentialsItem data={credentialsData}/>
            <CredentialsInfo data={credentialsData}/>
            <div className="withdraw__button">
               <Text grey>- Delete Credentials -</Text>
            </div>
         </StudentView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { req, query } = ctx

   try {
      const response = await axios.get(`${apiUrl}/credential?uuid=${query.uuid}`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      return { props: { data } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}