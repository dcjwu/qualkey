import Head from "next/head"

import ContactView from "../../components/ContactView/ContactView"
import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

export default function Contact() {
   return (
      <>
         <Head>
            <title>Contact Us | QualKey</title>
         </Head>
         <EmployerView share>
            <Heading blue h1>Contact Us</Heading>
            <ContactView employer/>
         </EmployerView>
      </>
   )
}