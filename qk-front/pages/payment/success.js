import Image from "next/image"
import { useRouter } from "next/router"

import success from "../../assets/images/congrats.svg"
import Button from "../../components/UI/Button/Button"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"

export default function Success() {
   
   const { push } = useRouter()

   return (
      <div className="payment__wrapper">
         <Image alt="success" src={success}/>
         <Heading blue h2 modal>Congratulations</Heading>
         <Text large>Your payment has been accepted.
            Credential is now activated.</Text>
         <Button blue thin onClick={() => push("/dashboard")}>Return to dashboard</Button>
      </div>
   )
}