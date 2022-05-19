import { useCallback, useEffect, useRef, useState } from "react"

import axios from "axios"
import moment from "moment"
import { useRouter } from "next/router"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { forgotFormState, loginFormState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconLoading } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const TwoFactorForm = ({ canBeResendAt, forgotPassword }) => {

   const { push } = useRouter()

   const calculateDuration = eventTime => moment.duration(Math.max(eventTime - (Math.floor(moment.utc(new Date().toISOString()).valueOf() / 1000)), 0), "seconds")

   const resetFormData = useResetRecoilState(loginFormState)
   const formData = useRecoilValue(loginFormState)
   const forgotFormData = useRecoilValue(forgotFormState)
   const [hideResendButton, setHideResendButton] = useState(false)
   const [duration, setDuration] = useState(calculateDuration(canBeResendAt))
   const [pinValues, setPinValues] = useState(["", "", "", ""])
   const [buttonError, setButtonError] = useState("")
   const [pinError, setPinError] = useState(false)
   const [loading, setLoading] = useState(false)

   const timerRef = useRef(0)

   const timerCallback = useCallback(() => {
      setDuration(calculateDuration(canBeResendAt))
      setHideResendButton(false)
   }, [canBeResendAt])

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
                  if (error.response.statusText === "Unprocessable Entity") {
                     setButtonError("Incorrect code")
                  } else {
                     setButtonError(error.response.statusText)
                  }
               })
         } else {
            axios.post(`${processingUrl}/auth/login`, { ...formData, otp: pinValues.join("") }, { withCredentials: true })
               .then(response => {
                  push(response.data)
                  resetFormData()
               })
               .catch(error => {
                  setLoading(false)
                  if (error.response.statusText === "Unprocessable Entity") {
                     setButtonError("Incorrect code")
                  } else {
                     setButtonError(error.response.statusText)
                  }
               })
         }
      } else {
         setButtonError("Please, fill all numbers")
         setPinError(true)
      }
   }

   useEffect(() => {
      timerRef.current = setInterval(timerCallback, 1000)
      return () => {
         clearInterval(timerRef.current)
      }
   }, [canBeResendAt])

   useEffect(() => {
      setHideResendButton(true)
      return () => {
         setLoading(false)

      }
   }, [])

   return (
      <div className={`${styles.loginPage}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Check your email</Heading>
            <Text grey>Enter the 4-digit code we’ve sent to your
               email</Text>
            <form onSubmit={handleSubmitForm}>
               <Input loading={loading} pinError={pinError} pinValues={pinValues}
                      setPinValues={setPinValues}
                      type={"pinCode"}/>
               {buttonError ? <Button bold error thin>{buttonError}</Button> : <Button blue bold thin
                                                                                       disabled={loading}>{loading ?
                     <IconLoading/> : "Next"}</Button>}
               {
                  hideResendButton ? <Text transparent>-</Text>
                     : duration.minutes() === 0 && duration.seconds() === 0
                        ? <Text grey>Resend code</Text>
                        : <Text grey>{`${duration.minutes()}:${duration.seconds()}`}</Text>
               }
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