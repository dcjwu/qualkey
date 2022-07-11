import { useEffect, useState } from "react"

import axios from "axios"
import moment from "moment"
import Image from "next/image"
import { useRecoilState, useResetRecoilState } from "recoil"

import logo from "../../assets/images/qk-logo-text.svg"
import { forgotFormState, formValidationErrorsState, loadingState } from "../../atoms"
import ForgotForm from "../../components/AuthForms/FormTypes/ForgotForm"
import TwoFactorForm from "../../components/AuthForms/FormTypes/TwoFactorForm"
import Heading from "../../components/UI/Heading/Heading"
import { processingUrl, validateLoginForm } from "../../utils"

export default function ForgotPassword() {

   const resetFormData = useResetRecoilState(forgotFormState)
   const [formData, setFormData] = useRecoilState(forgotFormState)
   const [, setFormError] = useRecoilState(formValidationErrorsState)
   const [, setLoading] = useRecoilState(loadingState)
   const [canBeResendAt, setCanBeResendAt] = useState(null)
   const [showTwoFactor, setShowTwoFactor] = useState(false)
   const [buttonError, setButtonError] = useState("")

   /**
    * Input value handling.
    */
   const handleEmailFormChange = e => {
      setFormData({
         ...formData,
         email: e.target.value
      })
   }

   /**
    * Form submit handling.
    */
   const handleFormSubmit = e => {
      e.preventDefault()
      const validation = validateLoginForm(formData)
      if (Object.keys(validation).length) {
         setFormError(validation)
      } else {
         setLoading(true)
         axios.post(`${processingUrl}/auth/otp`, { email: formData.email }, { withCredentials: true })
            .then(response => {
               setCanBeResendAt(moment.utc(response.data.canBeResentAt).valueOf() / 1000)
               setFormData({
                  ...formData,
                  otpUuid: response.data.otpUuid
               })
               setShowTwoFactor(true)
            })
            .catch(error => {
               setLoading(false)
               setFormError(false)
               if (error.response.data.message.includes("User with email")) {
                  setButtonError("User not found")
               } else {
                  setButtonError(error.response.data.error)
               }

            })
      }
   }

   /**
    * Resets form.
    */
   useEffect(() => {
      resetFormData()
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      axios.post(`${processingUrl}/auth/logout`, {}, { withCredentials: true })
   }, [])

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               {
                  !showTwoFactor
                     ? <ForgotForm buttonError={buttonError} changeFormHandler={handleEmailFormChange} submitFormHandler={handleFormSubmit}/>
                     : <TwoFactorForm forgotPassword canBeResendAt={canBeResendAt}/>
               }
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