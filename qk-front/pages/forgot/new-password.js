import { useEffect, useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import logo from "../../assets/images/qk-logo-text.svg"
import { forgotFormState, repeatPasswordState } from "../../atoms"
import NewPasswordForm from "../../components/AuthForms/FormTypes/NewPasswordForm"
import Heading from "../../components/UI/Heading/Heading"
import { processingUrl } from "../../utils"

export default function NewPassword() {
   
   const { push } = useRouter()
   
   const resetRepeatPasswordFormData = useResetRecoilState(repeatPasswordState)
   const forgotFormData = useRecoilValue(forgotFormState)
   const [repeatPasswordFormData, setRepeatPasswordFormData] = useRecoilState(repeatPasswordState)
   const [loading, setLoading] = useState(false)
   const [buttonError, setButtonError] = useState("")

   /**
    * Input value handling.
    */
   const handleFormChange = ({ target }) => {
      const { name, value } = target
      setRepeatPasswordFormData({
         ...repeatPasswordFormData,
         [name]: value
      })
   }

   /**
    * Form submit handling.
    */
   const handleFormSubmit = e => {
      e.preventDefault()
      if (repeatPasswordFormData.password !== repeatPasswordFormData.passwordRepeat) {
         setButtonError("Password no match")
      } else if (repeatPasswordFormData.password.trim() === "" || repeatPasswordFormData.passwordRepeat.trim() === "") {
         setButtonError("Field cannot be empty")
      } else {
         setLoading(true)
         axios.post(`${processingUrl}/auth/password-forgot`, { ...forgotFormData, newPassword: repeatPasswordFormData.password }, { withCredentials: true })
            .then(response => {
               if (response.status === 200) {
                  push("/dashboard")
               } else {
                  setButtonError("Unexpected error")
               }
            })
            .catch(error => {
               console.log(error)
               setButtonError(error.response.statusText)
            })
      }
   }

   /**
    * Resets password fields.
    */
   useEffect(() => {
      resetRepeatPasswordFormData()
   }, []) // eslint-disable-line react-hooks/exhaustive-deps


   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <NewPasswordForm buttonError={buttonError} formChangeHandler={handleFormChange}
                                formSubmitHandler={handleFormSubmit}
                                loading={loading}/>
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