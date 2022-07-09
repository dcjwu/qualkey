import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"

import Certificate from "../components/Certificate/Certificate"
import EmployerView from "../components/EmployerView/EmployerView"
import Heading from "../components/UI/Heading/Heading"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function DidPage({ didData }) {

   console.log(didData)

   return(
      <>
         <Head>
            <title>Shared Credentials | QualKey</title>
         </Head>
         <EmployerView publicPage did={didData.did}>
            <Heading blue h1 share><span>{didData.graduatedName}</span> has shared their credentials with
               you</Heading>
            <Certificate sharePage data={didData}/>
         </EmployerView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { query } = ctx
   
   try {
      const responseDid = await axios.get(`${apiUrl}/credential/${query.did}`)
      const { data: didData } = responseDid
      return { props: { didData } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}