import React from "react"

import axios from "axios"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"

import { ResendOtp } from "@components/ResendOtp/ResendOtp"
import { authUrl } from "@constants/urls"
import { AuthFlowStepsEnum } from "@customTypes/common"
import { useAuthFlow } from "@hooks/useAuthFlow"
import { useGetOtp } from "@hooks/useGetOtp"
import { Button, Input, InputOtp, Form, Loading } from "@lib/components"
import { handleAxiosError } from "@utils/handleAxiosError"

import type { FormDataType } from "@customTypes/common"
import type{ IndexLayoutType } from "@customTypes/layouts"
import type { NextPage } from "next"
import type PinInput from "react-pin-input"

const IndexLayout = dynamic<IndexLayoutType>(() => import("@layouts/IndexLayout/IndexLayout").then(module => module.IndexLayout),
   { loading: () => <Loading isOpen={true}/> })

const forgotFormInitialState = {
   email: "",
   otp: "",
   newPassword: "",
   repeatNewPassword: ""
}

const authFlowStepsMapping = new Map([
   [AuthFlowStepsEnum.FORM, [
      "Forgot password",
      "Enter your email and we will send you a 4-digit code needed to reset your password.",
      "Send 4-Digit Code"
   ]],
   [AuthFlowStepsEnum.OTP, [
      "Check your email",
      "Enter the 4-digit code we’ve sent to your email and then choose your new password",
      "Set New Password"
   ]],
   [AuthFlowStepsEnum.SET, ["Set new password", undefined, "Set New Password"]]
])

const Forgot: NextPage = (): JSX.Element => {

   const router = useRouter()

   const [authFlowStep, setAuthFlowStep, currentAuthFlowStep] = useAuthFlow(authFlowStepsMapping)
   const [pinInput, setPinInput] = React.useState<PinInput | null>(null)
   const [loading, setLoading] = React.useState<boolean>(false)
   const [error, setError] = React.useState<string>("")
   const [otpData, , handleGetOtp] = useGetOtp(authFlowStep, setError, setLoading, setAuthFlowStep, true)

   /**
    * Forgot form submit handler
    */
   const handleFormSubmit = async (event: React.SyntheticEvent, formData: FormDataType): Promise<void> => {
      event.preventDefault()
      const { email, otp, newPassword, repeatNewPassword } = formData

      if (authFlowStep === AuthFlowStepsEnum.FORM) {
         setLoading(true)
         handleGetOtp(email as string)
      }

      if (authFlowStep === AuthFlowStepsEnum.OTP) {
         setLoading(true)

         await axios.post(`${authUrl}/login-otp`, {
            email: email,
            otp: otp,
            otpUuid: otpData.otpUuid
         }, { withCredentials: true })

            .then(res => {
               setLoading(false)
               setError("")
               if (res.status === 200) {
                  setAuthFlowStep(AuthFlowStepsEnum.SET)

               } else {
                  setError("Unexpected response")
               }
            })

            .catch(err => {
               handleAxiosError(err as never, setError, pinInput, setLoading)
            })
      }

      if (authFlowStep === AuthFlowStepsEnum.SET) {
         if (repeatNewPassword !== newPassword) {
            setError("Passwords do not match")

         } else {
            setLoading(true)

            await axios.post(`${authUrl}/password-forgot`, {
               email: email,
               newPassword: newPassword
            }, { withCredentials: true })

               .then(res => {
                  setLoading(false)
                  if (res.status === 200) {
                     router.replace("/login")
                  } else {
                     setError("Unexpected response")
                  }

               })
               .catch(err => {
                  handleAxiosError(err as never, setError, pinInput, setLoading)
               })
         }
      }
   }

   return (
      <>
         <Head>
            <title>Forgot Password | QualKey</title>
         </Head>
      
         <IndexLayout header={currentAuthFlowStep && currentAuthFlowStep[0]}
                   subheader={currentAuthFlowStep && currentAuthFlowStep[1]}>

            <Form handleFormSubmit={handleFormSubmit} initialState={forgotFormInitialState}>

               {authFlowStep === AuthFlowStepsEnum.FORM && <>
                  <Input autoFocus fullWidth
                      required
                      name="email"
                      placeholder="Email"
                      type="email"/>
               </>}

               {authFlowStep === AuthFlowStepsEnum.OTP && <InputOtp setPinInput={setPinInput}/>}

               {authFlowStep === AuthFlowStepsEnum.SET && <>
                  <Input autoFocus fullWidth required
                      name="newPassword"
                      placeholder="New Password" type="password"/>
                  <Input fullWidth required name="repeatNewPassword"
                      placeholder="Confirm New Password" type="password"/>
               </>}

               <Button fullWidth error={error}
                    loading={loading}
                    size="lg"
                    type="submit"
                    variant="primary">
                  {currentAuthFlowStep && currentAuthFlowStep[2]}
               </Button>

               {authFlowStep === AuthFlowStepsEnum.OTP &&
               <ResendOtp handleGetOtp={handleGetOtp}/>
               }

               {authFlowStep === AuthFlowStepsEnum.FORM || authFlowStep === AuthFlowStepsEnum.SET ?
                  <Button fullWidth icon={<svg fill="none" height="16" viewBox="0 0 19 16"
                                            width="19" xmlns="http://www.w3.org/2000/svg">
                     <path d="M17.75 8L1.25 8" stroke="#0880CE" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                     <path d="M7.75 14.75L1 8L7.75 1.25" stroke="#0880CE" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  </svg>} loading={false}
                       size="lg"
                       style={{ marginTop: "6.4rem" }}
                       type="button"
                       variant="secondary"
                       onClick={(): Promise<boolean> => router.push("/login")}>
                  Go Back
                  </Button> : null}
            </Form>
         </IndexLayout>
      </>
   )
}

export default Forgot