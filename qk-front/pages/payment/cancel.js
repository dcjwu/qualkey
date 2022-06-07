import { useRouter } from "next/router"

import Button from "../../components/UI/Button/Button"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"

export default function Cancel() {
   
   const { push } = useRouter()

   return (
      <div className="payment__wrapper">
         <Heading error h2 modal>Canceled</Heading>
         <Text large>Your payment has been canceled.</Text>
         <Button blue thin onClick={() => push("/dashboard")}>Return to dashboard</Button>
      </div>
   )
}