import { useEffect, useState } from "react"

import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"
import { useRouter } from "next/router"

import SharedCredentialsItem from "../../components/DashboardItem/SharedCredentialsItem"
import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"
import ShareTemporaryPasswordModal from "../../components/UI/Modal/ShareTemporaryPasswordModal"
import Text from "../../components/UI/Text/Text"
import Error from "../_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function ShareCredentialsPage({ shareData, serverErrorMessage }) {

   const router = useRouter()

   const [temporaryPassword, setTemporaryPassword] = useState("")

   const handlePassword = ({ target }) => {
      setTemporaryPassword(target.value)
   }

   useEffect(() => {
      setTemporaryPassword("")
   }, [router.query.password])

   const handleFormSubmit = event => {
      event.preventDefault()
      router.push({
         pathname: "/share/[uuid]",
         query: { uuid: router.query.uuid, password: temporaryPassword }
      })
   }

   return (
      <>
         <Head>
            <title>Shared Credentials | QualKey</title>
         </Head>
         {
            shareData
               ? <EmployerView share>
                  <Heading blue h1 share><span>{shareData[0].graduatedName}</span> has shared their credentials with
                     you</Heading>
                  <Text large>view shared credentials</Text>
                  <div className="content__wrapper">
                     {shareData.map(item => {
                        return <SharedCredentialsItem key={item.did} data={item}/>
                     })}
                  </div>
               </EmployerView>
               : serverErrorMessage === "Forbidden"
                  ? <ShareTemporaryPasswordModal handleFormSubmit={handleFormSubmit}
                                                 handlePassword={handlePassword}
                                                 temporaryPassword={temporaryPassword}/>
                  : <Error serverErrorMessage={serverErrorMessage}/>
         }
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { query, res } = ctx

   res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
   )

   try {
      const responseShare = await axios.get(`${apiUrl}/credential/share/${query.uuid}?password=${query.password}`)
      const { data: shareData } = responseShare
      return { props: { shareData } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}