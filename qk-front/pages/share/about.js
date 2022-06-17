import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

export default function About() {
   return (
      <>
         <Head>
            <title>About Us | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1>About Us</Heading>
         </EmployerView>
      </>
   )
}