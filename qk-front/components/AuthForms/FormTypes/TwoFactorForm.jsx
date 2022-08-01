import { useEffect, useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { PinInput } from "react-input-pin-code"
import { useRecoilState, useResetRecoilState } from "recoil"

import { forgotFormState, loginFormState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconLoading } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const otpSeconds = 59
const otpValuesInitialState = ["", "", "", ""]

const TwoFactorForm = ({ forgotPassword }) => {

   const { push } = useRouter()

   const resetFormData = useResetRecoilState(loginFormState)
   const [formData, setFormData] = useRecoilState(loginFormState)
   const [forgotFormData, setForgotFormData] = useRecoilState(forgotFormState)
   const [pinValues, setPinValues] = useState(otpValuesInitialState)
   const [buttonError, setButtonError] = useState("")
   const [pinError, setPinError] = useState(false)
   const [loading, setLoading] = useState(false)
   const [seconds, setSeconds] = useState(otpSeconds)

   /**
    * Handler for timer and clearing data
    */
   useEffect(() => {
      const intervalId = setInterval(() => {
         setSeconds(prevState => prevState - 1)
      }, 1000)
      if (seconds === 0) {
         clearInterval(intervalId)
      }
      return () => {
         clearInterval(intervalId)
      }
   }, [seconds])

   /**
    * Form submit handling.
    **/
   const handleSubmitForm = event => {
      event.preventDefault()
      const validation = () => {
         return !pinValues.includes("")
      }
      if (validation()) {
         setButtonError("")
         setPinError(false)
         setLoading(true)
         if (forgotPassword) {
            axios.post(`${processingUrl}/auth/login-otp`, {
               ...forgotFormData,
               otp: pinValues.join("")
            }, { withCredentials: true })
               .then(response => {
                  if (response.status === 200) {
                     push("forgot/new-password")
                  }
               })
               .catch(error => {
                  setLoading(false)
                  setPinValues(otpValuesInitialState)
                  setButtonError(error.response.data.message)
               })
         } else {
            axios.post(`${processingUrl}/auth/login`, { ...formData, otp: pinValues.join("") }, { withCredentials: true })
               .then(() => {
                  push("/dashboard")
                  resetFormData()
               })
               .catch(error => {
                  setLoading(false)
                  setPinValues(otpValuesInitialState)
                  setButtonError(error.response.data.message)
               })
         }
      } else {
         setButtonError("Please, fill all numbers")
         setPinError(true)
      }
   }

   /**
    * Resend code handler
    */
   const handleResendCode = async () => {
      if (forgotPassword) {
         await axios.post(`${processingUrl}/auth/otp`, { email: forgotFormData.email })
            .then(response => {
               if (response.status === 201) {
                  setForgotFormData({
                     ...forgotFormData,
                     otpUuid: response.data.otpUuid
                  })
                  setSeconds(otpSeconds)
               }
            })
            .catch(error => console.log(error))
      } else {
         await axios.post(`${processingUrl}/auth/otp`, { email: formData.email })
            .then(response => {
               if (response.status === 201) {
                  setFormData({
                     ...formData,
                     otpUuid: response.data.otpUuid
                  })
                  setSeconds(otpSeconds)
               }
            })
            .catch(error => console.log(error))
      }
   }

   return (
      <div className={`${styles.loginPage}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Check your email</Heading>
            <Text grey>Enter the 4-digit code we’ve sent to your
               email</Text>
            <form onSubmit={handleSubmitForm}>
               <PinInput autoFocus={true}
                         containerClassName={`pinCode${pinError ? " error" : ""}${loading ? " loading" : ""}`}
                         disabled={false}
                         name="pinCode"
                         placeholder=""
                         size="sm"
                         values={pinValues}
                         onChange={(value, index, values) => setPinValues(values)}
               />
               {buttonError && <Text error small>{buttonError}</Text>}
               <Button blue bold thin
                       disabled={loading}>{loading ?
                     <IconLoading/> : "Next"}</Button>
               {seconds
                  ? <Text grey>00:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                  : <Text grey onClick={handleResendCode}>Resend code</Text>}
            </form>
         </div>
         <div className={styles.copyright}>
            <Text grey small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text grey small underline
                  link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )
}

export default TwoFactorForm

TwoFactorForm.propTypes = {
   canBeResendAt: PropTypes.number,
   forgotPassword: PropTypes.bool
}