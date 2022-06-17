import Image from "next/image"
import { useRouter } from "next/router"

import success from "../../assets/images/congrats.svg"
import { IconAcademicCap, IconAcademicCapPerson } from "../../components/UI/_Icon"
import Button from "../../components/UI/Button/Button"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import Topbar from "../../components/UI/Topbar/Topbar"

export default function Success() {
   
   const { push } = useRouter()

   return (
      <>
         <Topbar payment/>
         <div className="payment__wrapper">
            <Image alt="success" src={success}/>
            <Heading blue h2 modal>Congratulations</Heading>
            <Text large>Your payment has been accepted. You will receive an
               email containing your transaction details.</Text>
            <div className="credentials__mini">
               <div className="credentials__mini--item">
                  <IconAcademicCapPerson/>
                  <Text semiBold>lasdkfjl lksdjf</Text>
               </div>
               <div className="credentials__mini--item">
                  <IconAcademicCap/>
                  <Text semiBold>sfglkjdf jgldkfs jldkgjs sdfg</Text>
               </div>
            </div>
            <Text bold>You will be re-directed back to the dashboard in 5...</Text>
            <Text grey>or press</Text>
            <Button blue thin onClick={() => push("/dashboard")}>Return to dashboard</Button>
         </div>
      </>
   )
}