import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

const Policy = () => {
   return (
      <>
         <Head>
            <title>Privacy Policy | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1>Privacy Policy</Heading>
         </EmployerView>
      </>
   )
}

export default Policy