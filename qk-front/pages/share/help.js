import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

export default function Help() {
   return (
      <>
         <Head>
            <title>Help & FAQ | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1>Help & FAQ</Heading>
         </EmployerView>
      </>
   )
}