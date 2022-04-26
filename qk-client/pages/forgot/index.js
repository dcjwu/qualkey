import Image from "next/image"

import logo from "../../assets/images/qk-logo-xl.svg"
import AuthForm from "../../components/AuthForm/AuthForm"
import Heading from "../../components/UI/Heading/Heading"

export default function ForgotPassword() {

   // TODO: Declare callback axios post request to API and pass to AuthForm

   return (
      <div className="auth">
         <div className="container">
            <div className="auth__wrapper">
               <AuthForm forgot/>
               <div className="logo">
                  <Image alt="Qualkey" height={293} src={logo}
                         width={426}/>
                  <Heading h2 white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}