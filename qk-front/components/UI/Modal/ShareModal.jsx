import { useEffect, useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { formEmailState, formShareState, showShareModalState, studentNameState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconClose, IconLock, IconShare, IconShowDropdown } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const shareData = [
   {
      title: "Qualification Level",
      value: "qualificationLevel"
   }, {
      title: "Award Level",
      value: "awardLevel"
   },
   {
      title: "Study Language",
      value: "studyLanguage"
   }, {
      title: "Info",
      value: "info"
   }, {
      title: "GPA Final Grade",
      value: "gpaFinalGrade"
   }, {
      title: "Study Started At",
      value: "studyStartedAt"
   }, {
      title: "Study Ended At",
      value: "studyEndedAt"
   }, {
      title: "Graduated At",
      value: "graduatedAt"
   }, {
      title: "Expires At",
      value: "expiresAt"
   }
].sort((a, b) => a.title.localeCompare(b.title))

const initialValues = {
   uuids: [],
   recipientEmails: [],
   sharedFields: [],
   expiresAt: 0
}

const ShareModal = () => {

   const router = useRouter()


   const resetFormEmailFromReshare = useResetRecoilState(formEmailState)
   const formUuids = useRecoilValue(formShareState)
   const formEmailFromReshare = useRecoilValue(formEmailState)
   const studentName = useRecoilValue(studentNameState)
   const [, setShowShareModal] = useRecoilState(showShareModalState)
   const [step, setStep] = useState(3)
   const [showExpires, setShowExpires] = useState(false)
   const [shareAll, setShareAll] = useState(true)
   const [shareSelection, setShareSelection] = useState(false)
   const [toCloseModal, setToCloseModal] = useState(false)
   const [formData, setFormData] = useState(initialValues)
   const [emailInput, setEmailInput] = useState("")
   const [dropdownValue, setDropdownValue] = useState("")
   const [dataToShare, setDataToShare] = useState([])
   const [error, setError] = useState("")

   /**
    * Ask if modal should be closed
    */
   const handleRequestCloseModal = () => {
      setToCloseModal(true)
   }

   /**
    * Close modal handler.
    */
   const closeModal = () => {
      setShowShareModal(false)
      setFormData(initialValues)
      router.reload(window.location.pathname)
   }

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      setToCloseModal(true)
      event.stopPropagation()
   }

   /**
    * Shows expires dropdown
    */
   const handleShopExpiresDropdown = event => {
      event.preventDefault()
      setShowExpires(prevState => !prevState)
   }

   /**
    * Selects all data to share
    */
   const handleShareAll = () => {
      setShareSelection(false)
      setShareAll(true)
   }

   /**
    * Allows to choose what data to share
    */
   const handleShareSelection = () => {
      setShareSelection(true)
      setShareAll(false)
   }

   /**
    * Email input handler
    */
   const handleEmailInput = ({ target }) => {
      setEmailInput(target.value)
   }

   /**
    * Expiration dropdown value handler
    */
   const handleDropdownValue = ({ target }) => {
      setDropdownValue(target.innerText)
      setShowExpires(false)
      const newDate = Date.now() + +(target.getAttribute("value"))
      setFormData({
         ...formData,
         expiresAt: new Date(newDate).toISOString()
      })
   }

   /**
    * Handler that adjust which data to share
    */
   const handleRemoveShareData = ({ target }) => {
      const { value, checked } = target
      if (checked === false) {
         const newArray = dataToShare.filter(item => item !== value)
         setDataToShare(newArray)
      } else {
         const elementExists = dataToShare.filter(item => item === value)
         if (!elementExists.length) {
            setDataToShare([
               ...dataToShare, value
            ])
         }
      }
   }

   /**
    * Adds shared data to new array
    */
   useEffect(() => {
      let newArray = []
      shareData.map(item => {
         newArray.push(item.value)
      })
      setDataToShare(newArray)
   }, [])

   /**
    * Set recipientEmail value
    */
   useEffect(() => {
      setFormData({
         ...formData,
         recipientEmails: [emailInput]
      })
   }, [emailInput]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Sets sharedFields value
    */
   useEffect(() => {
      setFormData({
         ...formData,
         sharedFields: [...dataToShare]
      })
   }, [dataToShare.length]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Sets uuids value
    */
   useEffect(() => {
      if (formUuids.length) {
         setFormData({
            ...formData,
            uuids: [...formUuids]
         })
      }
   }, [formUuids.length]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Check if this is resharing flow
    */
   useEffect(() => {
      if (formEmailFromReshare) {
         setEmailInput(formEmailFromReshare)
         setFormData({
            ...formData,
            recipientEmails: [formEmailFromReshare],
            uuids: [...formUuids]
         })
      }
   }, [formEmailFromReshare]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Reset email from reshare flow
    */
   useEffect(() => {
      return () => {
         resetFormEmailFromReshare()
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Share submit handler
    */
   const handleFormSubmit = async event => {
      event.preventDefault()

      await axios.post(`${processingUrl}/credential/share`, { ...formData }, { withCredentials: true })
         .then(() => {
            setError("")
            setStep(3)
         })
         .catch(error => {
            console.log(error)
            if (error.response.data.message.includes("Values should be valid emails")) {
               setError("Invalid email format")
            } else {
               setError(error.response.data.message)
            }
         })
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={`${styles.wrapper} ${styles.share}`} onClick={event => event.stopPropagation()}>
            <IconClose onClick={handleRequestCloseModal}/>
            <ModalSteps step={step} totalSteps={3}/>
            {
               toCloseModal
                  ? <div className={`${styles.top} ${styles.shareReturn}`}>
                     <div className={`${styles.wrapperInner} ${styles.share}`}>
                        <Heading blue h2 modal>Are you sure you want to close this window?</Heading>
                        <Text>In order to share credentials, you must click on the share credentials button at the
                           bottom of the window.
                        </Text>
                     </div>
                     <div className={`${styles.stepWrapper} ${styles.approved} ${styles.request} ${styles.sureToClose}`}>
                        <Button blue thin onClick={() => setToCloseModal(false)}>No, go back</Button>
                        <Button blue thin onClick={closeModal}>Return to Dashboard</Button>
                     </div>
                  </div>
                  : step === 1
                     ? <div className={`${styles.top}`}>
                        <div className={`${styles.wrapperInner} ${styles.share}`}>
                           <Heading blue h2 modal>Review your email</Heading>
                           <Text grey>You are sharing <span>({formUuids.length})</span> credentials. Please review your
                              email
                              and shared data.</Text>
                           {error && <Text error>{error}</Text>}
                        </div>
                        <form className={styles.emailForm} onSubmit={handleFormSubmit}>
                           <div className={styles.inputWrapper}>
                              <input required id="emailInput" type="text"
                                     value={emailInput}
                                     onChange={handleEmailInput}/>
                              {!emailInput && <label htmlFor="emailInput">Email:</label>}
                           </div>
                           <div className={styles.shareEmail}>
                              <div className={styles.message}>
                                 <div className={styles.dear}>
                                    <Text medium>Dear, </Text>
                                    <div className={styles.inputWrapper}>
                                       <input required id="dearInput" type="text"/>
                                       <label htmlFor="dearInput">{"Recipient's name:"}</label>
                                    </div>
                                 </div>
                                 <Text medium><span>{studentName}</span> has chosen to share their authenticated education
                                    credentials with you.</Text>
                                 <Text medium>QualKey uses blockchain technology to provide secure and instant credential
                                    verification.</Text>
                                 <Text medium>Please follow the link below to view the credentials. This link will expire
                                    in 48 hours.</Text>
                                 <div className={styles.mockButton}><Text medium>Link to shared credentials</Text></div>
                                 <Text medium>Kind Regards,</Text>
                                 <Text medium>Qualkey</Text>
                              </div>
                           </div>
                           <div className={styles.adjust}>
                              <Button blue thin onClick={() => setStep(prevState => prevState + 1)}>
                                 <div className={styles.rowButton}>
                                    <IconLock/>
                                    <Text>Adjust shared data</Text>
                                 </div>
                              </Button>
                              <div className={styles.expires}>
                                 <Text semiBold>Link expires in:</Text>
                                 <div className={styles.expiresWrapper}>
                                    <button onClick={handleShopExpiresDropdown}>
                                       <div className={styles.rowButton}>
                                          <Text>{dropdownValue ? dropdownValue : "Choose"}</Text>
                                          <IconShowDropdown/>
                                       </div>
                                    </button>
                                    <div className={styles.showExpires} style={{ display: showExpires ? "block" : "" }}>
                                       <ul>
                                          <li value={1577847600000} onClick={handleDropdownValue}>Never</li>
                                          <li value={172800000} onClick={handleDropdownValue}>48 Hours</li>
                                          <li value={1209600000} onClick={handleDropdownValue}>14 Days</li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <Button blue thin disabled={!emailInput || !dropdownValue}>
                              <div className={styles.rowButton}>
                                 <IconShare/>
                                 <Text>Share Credentials</Text>
                              </div>
                           </Button>
                        </form>
                     </div>
                     : step === 2
                        ? <div className={`${styles.top}`}>
                           <div className={`${styles.wrapperInner} ${styles.share}`}>
                              <Heading blue h2 modal>Adjust shared data</Heading>
                              <Text grey>Please review your shared data from your authenticated credentials. By default,
                                 you
                                 share all credential data.</Text>
                           </div>
                           <div className={styles.wrapperAdjust}>
                              <div className={styles.radio}>
                                 <div className={styles.radioItem}>
                                    <input checked={shareAll} name="shareAll"
                                           type="radio"
                                           onChange={handleShareAll}/>
                                    <Text grey={!shareAll}>Share all credentials</Text>
                                 </div>
                                 <div className={styles.radioItem}>
                                    <input checked={shareSelection} name="shareSelection" type="radio"
                                           onChange={handleShareSelection}/>
                                    <Text grey={!shareSelection}>Share a selection of credentials</Text>
                                 </div>
                              </div>
                              {!shareAll ? <div className={styles.adjustData}>
                                 <ul>
                                    {shareData.map(item => {
                                       return <li key={item.value} className={styles.adjustDataItem}>
                                          <Text>{item.title}</Text>
                                          <input checked={dataToShare.includes(item.value)} type="checkbox"
                                                 value={item.value}
                                                 onChange={handleRemoveShareData}/>
                                       </li>
                                    })}
                                 </ul>
                              </div> : null}
                              <Button blue thin onClick={() => setStep(prevState => prevState - 1)}>Confirm shared
                                 data</Button>
                           </div>
                        </div>
                        : step === 3
                           ? <div className={`${styles.top} ${styles.shareReturn}`}>
                              <div className={`${styles.wrapperInner} ${styles.share} ${styles.shareReturn}`}>
                                 <Heading blue h2 modal>Congratulations</Heading>
                                 <Text>Your credentials have been shared! You now may close this window.</Text>
                              </div>
                              <Button blue thin onClick={() => router.reload(window.location.pathname)}>Return to
                                 Dashboard</Button>
                           </div>
                           : null
            }
         </div>
      </div>
   )
}

export default ShareModal