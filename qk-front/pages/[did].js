import axios from "axios"
import getConfig from "next/config"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"

import EmployerView from "../components/EmployerView/EmployerView"
import Heading from "../components/UI/Heading/Heading"
import Error from "./_error"

const Certificate = dynamic(import("../components/Certificate/Certificate"))

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function DidPage({ didData, serverErrorMessage }) {

   const { query } = useRouter()

   return (
      <>
         {didData
            ? <>
               <Head>
                  <title>Shared Credentials | QualKey</title>
                  <meta content="Shared Credentials | QualKey" property="og:title"/>
                  <meta content="https://public-images-qualkey-test.s3.eu-north-1.amazonaws.com/qk_share.png"
                           property="og:image"/>
                  <meta content={`${didData.graduatedName} has shared their credentials with you`}
                           property="og:description"/>
                  <meta content={`${process.env.NEXT_PUBLIC_FRONT_URL}/${query.did}`} property="og:url"/>
               </Head>
               <EmployerView publicPage did={didData.did}>
                  <Heading blue h1 share><span>{didData.graduatedName}</span> has shared their credentials with
                        you</Heading>
                  <Certificate sharePage data={didData}/>
               </EmployerView>
            </>
            : <Error serverErrorMessage={serverErrorMessage}/>}
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
      const responseDid = await axios.get(`${apiUrl}/credential/${query.did}`)
      const { data: didData } = responseDid
      return { props: { didData } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}