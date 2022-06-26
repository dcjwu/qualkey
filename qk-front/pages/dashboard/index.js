import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"

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

export default function Dashboard({ data, allCredentialsData, userData, notificationsData, serverErrorMessage }) {

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role } = userData

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>University Dashboard | QualKey</title>
         </Head>
         <InstitutionView credentials institution notificationsData={notificationsData}
                          userData={userData}>
            <Heading blue h1 xxl>University Dashboard</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionDashboard allCredentialsData={allCredentialsData} data={data}/>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>Credentials Dashboard | QualKey</title>
         </Head>
         <StudentView credentials notificationsData={notificationsData} userData={userData}>
            <Heading blue h1 xxl>Credentials Dashboard</Heading>
            <Text large>view, share and manage your credentials</Text>
            <StudentDashboard data={data}/>
         </StudentView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { req, query } = ctx
   let response
   let responseAllCredentials
   let responseUser

   if (query.filter) {
      try {
         response = await axios.get(`${apiUrl}/credential?filter=${query.filter}`, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie || "" }
         })
         responseAllCredentials = await axios.get(`${apiUrl}/credential`, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie || "" }
         })
         responseUser = await axios.get(`${apiUrl}/user/me`, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie || "" }
         })
         const responseNotifications = await axios.get(`${apiUrl}/action`, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie || "" }
         })
         const { data } = response
         const { data: allCredentialsData } = responseAllCredentials
         const { data: userData } = responseUser
         const { data: notificationsData } = responseNotifications
         return { props: { data, allCredentialsData, userData, notificationsData } }
      } catch (error) {
         return { props: { serverErrorMessage: error.response.statusText } }
      }
   } else {
      try {
         response = await axios.get(`${apiUrl}/credential`, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie || "" }
         })
         responseUser = await axios.get(`${apiUrl}/user/me`, {
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
         return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
      }
   }
}