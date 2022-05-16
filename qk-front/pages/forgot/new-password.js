import axios from "axios"
import getConfig from "next/config"
import Image from "next/image"

import logo from "../../assets/images/qk-logo-text.svg"
import NewPasswordForm from "../../components/AuthForms/FormTypes/NewPasswordForm"
import Heading from "../../components/UI/Heading/Heading"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function NewPassword() {

   // TODO: Declare callback axios post request to API and pass to AuthForms

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <NewPasswordForm/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image priority alt="Qualkey" layout="fill"
                            quality={100}
                            src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}

export const getServerSideProps = async ({ req }) => {
   try {
      const response = await axios.get(`${apiUrl}/auth/verify`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      if (data.redirectTo === "/dashboard") {
         return {
            redirect: {
               permanent: false,
               destination: "/dashboard"
            }
         }
      }
      return { props: { data } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}