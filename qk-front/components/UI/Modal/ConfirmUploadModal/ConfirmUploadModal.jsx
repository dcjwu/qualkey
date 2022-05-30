import { useState } from "react"

import axios from "axios"
import moment from "moment"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { confirmUploadModalState, userActionUploadDecisionState } from "../../../../atoms"
import { processingUrl } from "../../../../utils"
import { IconClose, IconDownload, IconLoading, IconUpload } from "../../_Icon"
import Button from "../../Button/Button"
import Heading from "../../Heading/Heading"
import Text from "../../Text/Text"
import styles from "../Modal.module.scss"
import ModalSteps from "../ModalSteps/ModalSteps"

const ConfirmUploadModal = () => {
   
   const router = useRouter()

   const resetUploadDecision = useResetRecoilState(userActionUploadDecisionState)
   const uploadDecision = useRecoilValue(userActionUploadDecisionState)
   const [, setConfirmUploadModal] = useRecoilState(confirmUploadModalState)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [fileName, setFileName] = useState("")
   const [step, setStep] = useState(1)
   const [confirmed, setConfirmed] = useState(false)
   const [rejected, setRejected] = useState(false)

   /**
    * Close modal.
    */
   const closeModal = () => {
      if (step === 4) {
         router.reload(window.location.pathname)
      }
      setConfirmUploadModal(false)
      resetUploadDecision()
   }

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   console.log(uploadDecision, "dec")

   /**
    * Download file
    */
   const handleFileDownload = async event => {
      setError("")
      if (step === 1) {
         setLoading(true)
      }
      await axios.get(`${processingUrl}/upload?uuid=${uploadDecision.subjectUuid}`, { withCredentials: true, responseType: "blob" })
         .then(response => {
            const fileType = response.data.type === "application/csv" ? "csv" : null
            const fileName = `${moment.utc(+new Date()).format("DD.MM.YYYY")}-qkUpload.${fileType}`
            const blob = new Blob([response.data])
            const link = document.createElement("a")
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            setLoading(false)
            setFileName(fileName)
            if (step === 1) {
               setStep(prevState => prevState + 1)
            }
         })
         .catch(error => {
            setError(error.request.statusText)
            setLoading(false)
         })
      event.stopPropagation()
   }

   const handleConfirm = () => {
      setStep(prevState => prevState + 1)
      setConfirmed(true)
      setRejected(false)
   }

   const handleConfirmRequest = async () => {
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
            setError(error.request.statusText)
            setLoading(false)
         })
   }

   const handleReject = async () => {
      await axios.post(`${processingUrl}/action`, {
         actionId: uploadDecision.id.toString(),
         subjectUuid: uploadDecision.subjectUuid,
         type: uploadDecision.type,
         decision: "reject"
      }, { withCredentials: true })
         .then(response => {
            if (response.status === 200) {
               setStep(4)
               setRejected(true)
               setConfirmed(false)
            }
         })
         .catch(error => {
            console.log(error)
         })
   }

   const handleGoBack = () => {
      setStep(prevState => prevState - 1)
      setConfirmed(false)
      setRejected(false)
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={styles.wrapper} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <ModalSteps step={step}/>
            <div className={`${styles.top} ${styles.confirmUpload} ${step === 2 ? styles.stepTwo : ""}`}>
               <div className={`${styles.wrapperInner} ${styles.confirmUpload}`}>
                  {
                     rejected
                        ? <Heading error h2 modal>Credentials Rejected</Heading>
                        : <Heading blue h2 modal>
                           {step === 1 || step === 2 ? "Please Approve Credentials"
                              : step === 3 && confirmed ? "You chose to Approve"
                                 : step === 4 ? "Credentials Approved" : null}
                        </Heading>
                  }
                  {
                     rejected
                        ? <Text semiBold>You may now return to dashboard</Text>
                        : confirmed && step === 4
                           ? <Text semiBold>Credentials are now available for use. You may now return to dashboard</Text>
                           : confirmed
                              ? <Text semiBold>Please confirm your decision</Text>
                              : <Text semiBold><span>{uploadDecision.initiatorName}</span> uploaded new credentials that require approval</Text>
                  }
                  {
                     !rejected && !confirmed
                        ? error
                           ? <Button errorModal onClick={handleFileDownload}>
                              <IconUpload/>
                              <span>{error}</span>
                           </Button>
                           : loading
                              ? <Button disabled>
                                 <IconLoading/>
                              </Button>
                              : <Button blue thin onClick={handleFileDownload}>
                                 <div className={`${styles.row} ${styles.confirmUpload}`}>
                                    <IconDownload/>
                                    <Text semiBold>{step === 2 ? fileName : "Examine file"}</Text>
                                 </div>
                              </Button>
                        : null
                  }
                  {step === 2
                     ? <div className={styles.stepWrapper}>
                        <Button blue thin onClick={handleConfirm}>
                           <div className={`${styles.row} ${styles.confirmUpload}`}>
                              <IconDownload/>
                              <Text semiBold>Approve</Text>
                           </div>
                        </Button>
                        <Button error thin onClick={handleReject}>
                           <div className={`${styles.row} ${styles.confirmUpload}`}>
                              <IconDownload/>
                              <Text semiBold>Reject</Text>
                           </div>
                        </Button>
                     </div>
                     : step === 4
                        ? <Button blue thin onClick={closeModal}>
                           Return to Dashboard
                        </Button>
                        : confirmed
                           ? <div className={`${styles.stepWrapper} ${styles.approved}`}>
                              <Button blue thin onClick={handleConfirmRequest}>
                                 <div className={`${styles.row} ${styles.confirmUpload}`}>
                                    <IconDownload/>
                                    <Text semiBold>Approve</Text>
                                 </div>
                              </Button>
                              <Button blue outline thin
                                      onClick={handleGoBack}>
                                 <div className={`${styles.row} ${styles.confirmUpload}`}>
                                    <IconDownload/>
                                    <Text semiBold>Go Back</Text>
                                 </div>
                              </Button>
                           </div>
                           : null}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConfirmUploadModal