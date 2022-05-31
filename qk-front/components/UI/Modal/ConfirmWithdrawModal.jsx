import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

import { confirmWithdrawModalState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconClose, IconLoading } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const ConfirmWithdrawModal = () => {

   const router = useRouter()

   const [loading, setLoading] = useState(false)
   const [step, setStep] = useState(1)
   const [error, setError] = useState("")
   const [, setWithdrawModal] = useRecoilState(confirmWithdrawModalState)

   /**
    * Close modal.
    */
   const closeModal = () => {
      if (step === 2) {
         router.reload(window.location.pathname)
      }
      setWithdrawModal(false)
      setError("")
      setStep(1)
   }

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   /**
    * Request to withdraw credentials handler.
    */
   const handleWithdrawRequest = async () => {
      setLoading(true)
      await axios.post(`${processingUrl}/credential/withdraw`,
         { uuid: router.query.uuid },
         { withCredentials: true })
         .then(response => {
            if (response.status === 200) {
               setStep(prevState => prevState + 1)
               setLoading(false)
            }
         })
         .catch(error => {
            if (error.response.status === 409) {
               setError("Credential withdrawal already requested")
            } else {
               setError(error.response.statusText)
            }
            setLoading(false)
         })
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={styles.wrapper} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <ModalSteps step={step} totalSteps={2}/>
            <div className={`${styles.top} ${styles.confirmUpload}`}>
               <div className={`${styles.wrapperInner} ${styles.confirmUpload} ${styles.confirmWithdraw}`}>
                  {step === 2
                     ? <Heading blue h2 modal>
                        Withdraw request sent for approval
                     </Heading>
                     : <Heading blue h2 modal>
                        Do you wish to withdraw these credentials?
                     </Heading>}
                  {step === 2
                     ?
                     <Text semiBold>You will be notified as soon as the Head of Registrars approves this action. You may
                        now return to Dashboard</Text>
                     : error
                        ? <Text error semiBold>Error: {error}.</Text>
                        : <Text semiBold>This action will be first approved by the Head of Registrars before it takes
                           effect.</Text>}
                  {step === 2
                     ? <Button blue thin onClick={closeModal}>
                        Return to Dashboard
                     </Button>
                     : error
                        ? <div className={`${styles.stepWrapper} ${styles.approved}`}>
                           <Button blue outline thin
                                   onClick={closeModal}>
                              <Text semiBold>Go Back</Text>
                           </Button>
                        </div>
                        : <div className={`${styles.stepWrapper} ${styles.approved}`}>
                           {loading
                              ? <Button disabled>
                                 <IconLoading/>
                              </Button>
                              : <Button errorModal thin onClick={handleWithdrawRequest}>
                                 <Text semiBold>Withdraw</Text>
                              </Button>
                           }
                           <Button blue outline thin
                                   onClick={closeModal}>
                              <Text semiBold>Go Back</Text>
                           </Button>
                        </div>}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConfirmWithdrawModal