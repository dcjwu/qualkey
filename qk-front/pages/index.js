import { useEffect, useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-text.svg"
import { formValidationErrorsState, loadingState, loginFormState } from "../atoms"
import LoginForm from "../components/AuthForms/FormTypes/LoginForm"
import TwoFactorForm from "../components/AuthForms/FormTypes/TwoFactorForm"
import Heading from "../components/UI/Heading/Heading"
import { processingUrl, validateLoginForm } from "../utils"
import Error from "./_error"

export default function Home({ serverErrorMessage }) {

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [, setFormError] = useRecoilState(formValidationErrorsState)
   const [, setLoading] = useRecoilState(loadingState)
   const [showTwoFactor, setShowTwoFactor] = useState(false)

   /**
    * Input value handling.
    **/
   const handleLoginFormChange = ({ target }) => {
      const { name, value, type, checked } = target
      if (type !== "checkbox") {
         setFormData({
            ...formData,
            [name]: value
         })
      } else {
         setFormData({
            ...formData,
            [name]: checked
         })
      }
   }

   /**
    * Login processing.
    **/
   const handleLoginFormSubmit = async event => {
      event.preventDefault()
      setFormError({})

      const validation = validateLoginForm(formData)
      if (Object.keys(validation).length) {
         setFormError(validation)
      } else {
         setLoading(true)
         await axios.post(`${processingUrl}/auth/check`, formData)
            .then(response => {
               if (response.status === 200) {
                  setShowTwoFactor(true)
                  setLoading(false)
               }
            })
            .catch(error => {
               setLoading(false)
               if (error.response.data.message.includes("Role")) {
                  setFormError({ response: "Not authorized" })
               } else {
                  setFormError({ response: error.response.data.message })
               }
            })
      }
   }

   /**
    * Gets OTP from server.
    */
   useEffect(() => {
      if (showTwoFactor) {
         axios.post(`${processingUrl}/auth/otp`, { email: formData.email })
            .then(response => {
               setFormData({
                  ...formData,
                  otpUuid: response.data.otpUuid
               })
            })
            .catch(error => console.log(error))
      }
   }, [showTwoFactor]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Stops showing loading in UI.
    */
   useEffect(() => {
      setLoading(false)
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      axios.post(`${processingUrl}/auth/logout`, {}, { withCredentials: true })
   }, [])

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>
   
   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               {
                  !showTwoFactor
                     ? <LoginForm changeFormHandler={handleLoginFormChange} submitFormHandler={handleLoginFormSubmit}/>
                     : <TwoFactorForm/>
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