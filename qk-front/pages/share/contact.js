import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

export default function Contact() {
   return (
      <>
         <Head>
            <title>Contact Us | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1>Contact Us</Heading>
         </EmployerView>
      </>
   )
}