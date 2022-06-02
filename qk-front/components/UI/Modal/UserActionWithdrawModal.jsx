import { useEffect, useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { userActionUploadDecisionState, userActionWithdrawModalState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconAcademicCap, IconAcademicCapPerson, IconClose, IconDownload } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const UserActionWithdrawModal = () => {

   const router = useRouter()

   const resetUploadDecision = useResetRecoilState(userActionUploadDecisionState)
   const uploadDecision = useRecoilValue(userActionUploadDecisionState)
   const [, setWithdrawModal] = useRecoilState(userActionWithdrawModalState)
   const [step, setStep] = useState(1)
   const [error, setError] = useState("")
   const [rejected, setRejected] = useState(false)
   const [credentialData, setCredentialData] = useState({})

   /**
    * Close modal.
    */
   const closeModal = () => {
      if (step === 3) {
         router.reload(window.location.pathname)
      }
      setWithdrawModal(false)
      resetUploadDecision()
      setError("")
      setStep(1)
   }

   /**
    * Gets credential data when modal opens.
    */
   useEffect(() => {
      axios.get(`${processingUrl}/credential?uuid=${uploadDecision.credentialsUuid}`, { withCredentials: true })
         .then(response => {
            if (response.status === 200) {
               setCredentialData(response.data[0])
            }
         })
         .catch(error => {
            setError(error.response.statusText)
         })
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    * Handle go back
    */
   const handleGoBack = () => {
      setStep(prevState => prevState - 1)
   }

   /**
    * Confirm user action handler.
    */
   const handleApproveRequest = async () => {
      await axios.post(`${processingUrl}/action`, {
         actionId: uploadDecision.id.toString(),
         subjectUuid: uploadDecision.subjectUuid,
         type: uploadDecision.type,
         decision: "approve"
      }, { withCredentials: true })
         .then(response => {
            if (response.status === 200) {
               setStep(prevState => prevState + 1)
            }
         })
         .catch(error => {
            setError(error.response.statusText)
         })
   }

   /**
    * Reject user action handler.
    */
   const handleReject = async () => {
      await axios.post(`${processingUrl}/action`, {
         actionId: uploadDecision.id.toString(),
         subjectUuid: uploadDecision.subjectUuid,
         type: uploadDecision.type,
         decision: "reject"
      }, { withCredentials: true })
         .then(response => {
            if (response.status === 200) {
               setRejected(true)
               setStep(3)
            }
         })
         .catch(error => {
            setError(error.response.statusText)
         })
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={styles.wrapper} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <ModalSteps step={step} totalSteps={3}/>
            <div className={`${styles.top} ${styles.confirmUpload}`}>
               <div className={`${styles.wrapperInner} ${styles.confirmUpload} ${styles.confirmWithdraw}`}>
                  {
                     rejected && step === 3
                        ? <Heading blue h2 modal>
                           Withdrawal request declined
                        </Heading>
                        : step === 3
                           ? <Heading blue h2 modal>
                              Credentials withdrawn successfully
                           </Heading>
                           : step === 2
                              ? <Heading blue h2 modal>
                                 Confirm credential withdrawal
                              </Heading>
                              : <Heading blue h2 modal>
                              Credential withdrawal request. Your action is required.
                              </Heading>
                  }
                  {
                     step === 3
                        ? <Text semiBold>You may now return to dashboard</Text>
                        : step === 2
                           ? <Text bold error large>This action may NOT be reversed</Text>
                           : <Text semiBold>{uploadDecision.initiatorName} has put forward a credential withdrawal
                              request.</Text>
                  }
                  {error && <Text error semiBold>Error: {error}</Text>}
                  {
                     step === 1
                        ? <div className={styles.credentials}>
                           <div className={styles.credsItem}>
                              <IconAcademicCapPerson/>
                              <Text semiBold>{credentialData.graduatedName}</Text>
                           </div>
                           <div className={styles.credsItem}>
                              <IconAcademicCap/>
                              <Text semiBold>{credentialData.qualificationName}</Text>
                           </div>
                        </div>
                        : null
                  }
                  {
                     step === 3
                        ? <Button blue thin onClick={closeModal}>
                           Return to Dashboard
                        </Button>
                        : <div className={`${styles.stepWrapper} ${styles.approved}`}>
                           <Button errorModal thin onClick={step === 1 ? handleApproveWithdraw : step === 2 ? handleApproveRequest : null}>
                              <div className={`${styles.row} ${styles.confirmUpload}`}>
                                 <IconDownload/>
                                 <Text semiBold>Withdraw</Text>
                              </div>
                           </Button>
                           {
                              step === 1
                                 ? <Button blue thin
                                        onClick={handleReject}>
                                    <Text semiBold>Decline Request</Text>
                                 </Button>
                                 : <Button blue thin
                                           onClick={handleGoBack}>
                                    <Text semiBold>Go back</Text>
                                 </Button>
                           }
                        </div>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserActionWithdrawModal