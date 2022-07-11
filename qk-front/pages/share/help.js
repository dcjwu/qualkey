import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import HelpView from "../../components/HelpView/HelpView"
import Heading from "../../components/UI/Heading/Heading"

export default function Help() {
   return (
      <>
         <Head>
            <title>Help & FAQ | QualKey</title>
         </Head>
         <EmployerView share>
            <Heading blue h1>Help & FAQ</Heading>
            <HelpView/>
         </EmployerView>
      </>
   )
}