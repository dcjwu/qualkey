import Image from "next/image"

import logo from "../../assets/images/qk-logo-xl.png"
import AuthForm from "../../components/AuthForm/AuthForm"
import Heading from "../../components/UI/Heading/Heading"

export default function ForgotPassword() {

   // TODO: Declare callback axios post request to API and pass to AuthForm

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForm forgot/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image alt="Qualkey" layout="fill" src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}