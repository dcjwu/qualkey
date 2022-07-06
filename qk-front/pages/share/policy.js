import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"
import PolicyView from "../../components/PolicyView/PolicyView"

const Policy = () => {
   return (
      <>
         <Head>
            <title>Privacy Policy | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1>Privacy Policy</Heading>
            <PolicyView/>
         </EmployerView>
      </>
   )
}

export default Policy