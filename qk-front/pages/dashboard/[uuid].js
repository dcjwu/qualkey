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

export default function CredentialsView({ data, userData, notificationsData, serverErrorMessage }) {

   const showEditCredentials = useRecoilValue(showEditCredentialsState)

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role } = userData

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <InstitutionView userData={userData}>
            <Heading blue h1>View Credentials</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionViewCredentialsItem data={data[0]}/>
            {!showEditCredentials
               ? <CredentialsInfo data={data[0]}/>
               : <InstitutionEditCredentials data={data[0]}/>}
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
         <StudentView userData={userData}>
            <Heading blue h1>View Credentials</Heading>
            <Text large>view, share and manage your credentials</Text>
            <StudentViewCredentialsItem data={data[0]}/>
            <CredentialsInfo data={data[0]}/>
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
      const responseUser = await axios.get(`${apiUrl}/user/me`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const responseNotifications = await axios.get(`${apiUrl}/action`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      const { data: userData } = responseUser
      const { data: notificationsData } = responseNotifications
      return { props: { data, userData, notificationsData } }
   } catch (error) {
      console.log(error)
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}