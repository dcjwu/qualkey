import { useEffect, useState } from "react"

import axios from "axios"
import moment from "moment"
import getConfig from "next/config"
import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-text.svg"
import { formValidationErrorsState, loadingState, loginFormState } from "../atoms"
import LoginForm from "../components/AuthForms/FormTypes/LoginForm"
import TwoFactorForm from "../components/AuthForms/FormTypes/TwoFactorForm"
import Heading from "../components/UI/Heading/Heading"
import { processingUrl, validateLoginForm } from "../utils"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Home() {

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [, setFormError] = useRecoilState(formValidationErrorsState)
   const [, setLoading] = useRecoilState(loadingState)
   const [showTwoFactor, setShowTwoFactor] = useState(false)
   const [canBeResendAt, setCanBeResendAt] = useState(null)

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
    * @desc Validates inputs and sends request to server.
    * @param event Submit event.
    * @returns Redirect to dashboard page.
    * @throws Shows error in UI.
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

   useEffect(() => {
      if (showTwoFactor) {
         axios.post(`${processingUrl}/auth/otp`, { email: formData.email })
            .then(response => {
               setCanBeResendAt(moment.utc(response.data.canBeResentAt).valueOf() / 1000)
               setFormData({
                  ...formData,
                  otpUuid: response.data.otpUuid
               })
            })
            .catch(error => console.log(error))
      }
   }, [showTwoFactor])

   /**
    * Stops showing loading in UI.
    * @desc Sets loading state to false.
    */
   useEffect(() => {
      setLoading(false)
   }, [])
   
   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               {
                  !showTwoFactor
                     ? <LoginForm changeFormHandler={handleLoginFormChange} submitFormHandler={handleLoginFormSubmit}/>
                     : <TwoFactorForm canBeResendAt={canBeResendAt} formData={formData} setFormData={setFormData}/>
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