import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import PolicyView from "../../components/PolicyView/PolicyView"
import Heading from "../../components/UI/Heading/Heading"

const Policy = () => {
   return (
      <>
         <Head>
            <title>Privacy Policy | QualKey</title>
         </Head>
         <EmployerView share>
            <Heading blue h1>Privacy Policy</Heading>
            <PolicyView/>
         </EmployerView>
      </>
   )
}

export default Policy