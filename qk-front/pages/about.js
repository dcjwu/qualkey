import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"

import AboutView from "../components/AboutView/AboutView"
import InstitutionView from "../components/Institution/InstitutionView/InstitutionView"
import StudentView from "../components/Student/StudentView/StudentView"
import Heading from "../components/UI/Heading/Heading"
import { userRoles } from "../utils"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function About({ userData, notificationsData, serverErrorMessage }) {

   if (serverErrorMessage && serverErrorMessage !== "Unauthorized") return <Error serverErrorMessage={serverErrorMessage}/>
   else if (serverErrorMessage && serverErrorMessage === "Unauthorized") return (
      <>
         <Head>
            <title>About Us | QualKey</title>
         </Head>
         <StudentView publicPage notificationsData={[]} userData={[]}>
            <Heading blue h1>About Us</Heading>
            <AboutView/>
         </StudentView>
      </>
   )

   const { role } = userData

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>About Us | QualKey</title>
         </Head>
         <InstitutionView institution notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>About Us</Heading>
            <AboutView/>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>About Us | QualKey</title>
         </Head>
         <StudentView notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>About Us</Heading>
            <AboutView/>
         </StudentView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { req } = ctx

   try {
      const responseUser = await axios.get(`${apiUrl}/user/me`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const responseNotifications = await axios.get(`${apiUrl}/action`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data: userData } = responseUser
      const { data: notificationsData } = responseNotifications
      return { props: { userData, notificationsData } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}