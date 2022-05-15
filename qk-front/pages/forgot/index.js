import Image from "next/image"

import logo from "../../assets/images/qk-logo-text.svg"
import ForgotForm from "../../components/AuthForms/FormTypes/ForgotForm"
import Heading from "../../components/UI/Heading/Heading"

export default function ForgotPassword() {

   // TODO: Declare callback axios post request to API and pass to AuthForms

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <ForgotForm/>
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