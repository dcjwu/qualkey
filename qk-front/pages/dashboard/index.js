import axios from "axios"
import getConfig from "next/config"
import dynamic from "next/dynamic"
import Head from "next/head"

import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import StudentView from "../../components/Student/StudentView/StudentView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "./../_error"

const InstitutionDashboard = dynamic(import("../../components/Institution/InstitutionDashboard/InstitutionDashboard"))
const StudentDashboard = dynamic((import("../../components/Student/StudentDashboard/StudentDashboard")))

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ data, userData, notificationsData, serverErrorMessage }) {

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
            <InstitutionDashboard data={data}/>
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
   const { req, res, query } = ctx
   let response
   let responseUser

   res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
   )

   if (query.filter) {
      try {
         response = await axios.get(`${apiUrl}/credential?filter=${query.filter}`, {
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
         if (error.response.statusText === "Forbidden" || error.response.statusText === "Unauthorized") {
            return {
               redirect: {
                  permanent: false,
                  destination: "/"
               }
            }
         }
         return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
      }
   }
}