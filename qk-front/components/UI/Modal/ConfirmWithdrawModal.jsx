import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

import { confirmWithdrawModalState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconClose, IconDownload, IconLoading } from "../_Icon"
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
      if (step === 3) {
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
    * Credential withdraw approve
    */
   const handleApproveWithdraw = () => {
      setStep(prevState => prevState + 1)
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
            <ModalSteps step={step} totalSteps={3}/>
            <div className={`${styles.top} ${styles.confirmUpload}`}>
               <div className={`${styles.wrapperInner} ${styles.confirmUpload} ${styles.confirmWithdraw}`}>
                  {step === 3
                     ? <Heading blue h2 modal>
                        Withdraw request sent for approval
                     </Heading>
                     : step === 2
                        ? <Heading blue h2 modal>
                           Confirm credentials withdrawal request
                        </Heading>
                        : <Heading blue h2 modal>
                           Do you wish to withdraw these credentials?
                        </Heading>}
                  {step === 3
                     ?
                     <Text semiBold>You will be notified as soon as the Assigned Approver confirms this action. You may
                        now return to Dashboard</Text>
                     : error
                        ? <Text error semiBold>Error: {error}.</Text>
                        : <Text semiBold>This action will be first approved by the Assigned Approver before it takes
                           effect.</Text>}
                  {step === 3
                     ? <Button blue thin onClick={closeModal}>
                        Return to Dashboard
                     </Button>
                     : error
                        ? <div className={`${styles.stepWrapper} ${styles.approved}`}>
                           <Button blue thin
                                   onClick={closeModal}>
                              <Text semiBold>Go Back</Text>
                           </Button>
                        </div>
                        : <div className={`${styles.stepWrapper} ${styles.approved} ${styles.request}`}>
                           {loading
                              ? <Button disabled>
                                 <IconLoading/>
                              </Button>
                              : step === 2
                                 ? <Button errorModal thin onClick={handleWithdrawRequest}>
                                    <div className={`${styles.row} ${styles.confirmUpload}`}>
                                       <IconDownload/>
                                       <Text semiBold>Confirm Request</Text>
                                    </div>
                                 </Button>
                                 : <Button errorModal thin onClick={handleApproveWithdraw}>
                                    <div className={`${styles.row} ${styles.confirmUpload}`}>
                                       <IconDownload/>
                                       <Text semiBold>Withdraw</Text>
                                    </div>
                                 </Button>
                           }
                           <Button blue thin
                                   onClick={step === 2 || step === 3 ? () => setStep(prevState => prevState - 1) : closeModal}>
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