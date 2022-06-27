import { useEffect, useState } from "react"

import { useRouter } from "next/router"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { paymentCredentialsState } from "../../atoms"
import { IconAcademicCap, IconAcademicCapPerson } from "../../components/UI/_Icon"
import Button from "../../components/UI/Button/Button"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import Topbar from "../../components/UI/Topbar/Topbar"

export default function Cancel() {
   
   const { push } = useRouter()
   const resetCredentialsData = useResetRecoilState(paymentCredentialsState)
   const credentialsData = useRecoilValue(paymentCredentialsState)
   const [seconds, setSeconds] = useState(10)

   /**
    * Handler for timer and clearing data
    */
   useEffect(() => {
      if (!seconds) return
      const intervalId = setInterval(() => {
         setSeconds(prevState => prevState - 1)
      }, 1000)
      return () => {
         clearInterval(intervalId)
      }
   }, [seconds])

   /**
    * Handler to redirect user when seconds is 0
    */
   useEffect(() => {
      if (!seconds) {
         push("/dashboard")
      }
   }, [seconds])

   /**
    * Redirect user back if not data passed
    */
   useEffect(() => {
      if (!Object.keys(credentialsData).length) {
         push("/dashboard")
      }
      return () => {
         resetCredentialsData()
      }
   }, [])

   return (
      <>
         <Topbar payment/>
         <div className="payment__wrapper">
            <Heading error h2 modal>Credential activation failed</Heading>
            <Text large>Payment was not accepted at this time. You will receive an email containing your transcation details.</Text>
            <div className="credentials__mini">
               <div className="credentials__mini--item">
                  <IconAcademicCapPerson/>
                  <Text semiBold>{credentialsData.graduatedName}</Text>
               </div>
               <div className="credentials__mini--item">
                  <IconAcademicCap/>
                  <Text semiBold>{credentialsData.qualificationName}</Text>
               </div>
            </div>
            <Text bold>You will be re-directed back to the dashboard in {seconds}...</Text>
            <Text grey>or press</Text>
            <Button blue thin onClick={() => push("/dashboard")}>Return to dashboard</Button>
         </div>
      </>
   )
}