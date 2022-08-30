import React from "react"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { dataToShareState, isShareModalOpen, shareUuids } from "@atoms/shareModal.atom"
import { Button, Heading, Modal, Text } from "@lib/components"

import type { ShareModalEmailFormType, ShareModalType } from "@customTypes/components/Modals"

import styles from "./ShareModal.module.scss"

const EmailShareForm = dynamic<ShareModalEmailFormType>(() => import("@components/Modals/ShareModal/ShareModalEmailForm")
   .then(module => module.ShareModalEmailForm))
const ShareModalAdjustData = dynamic<Record<string, never>>(() => import("@components/Modals/ShareModal/ShareModalAdjustData")
   .then(module => module.ShareModalAdjustData))

const totalSteps = 3

enum DataSelectionEnum {
   ALL = "all",
   SELECTION = "selection"
}

export const ShareModal: React.FC<ShareModalType> = ({ name }): JSX.Element => {

   const router = useRouter()

   const resetShareData = useResetRecoilState(dataToShareState)
   const resetSharedUuids = useResetRecoilState(shareUuids)

   const [activeStep, setActiveStep] = React.useState<number>(1)

   const [shareModalOpen, setShareModalOpen] = useRecoilState(isShareModalOpen)
   const sharedUuids = useRecoilValue(shareUuids)

   const [adjustData, setAdjustData] = React.useState<boolean>(false)
   const [dataSelection, setDataSelection] = React.useState<DataSelectionEnum>(DataSelectionEnum.ALL)

   /**
    * Close modal handler
    */
   const handleCloseModal = (): void => {
      setShareModalOpen(false)
      resetSharedUuids()
      resetShareData()
   }

   /**
    * Radio input handler
    */
   const handleRadioInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setDataSelection(event.target.value as DataSelectionEnum)
   }

   /**
    * Confirm data handler
    */
   const handleConfirmData = (): void => {
      setAdjustData(false)
      setActiveStep(prevState => prevState + 1)
   }

   /**
    * Return to dashboard handler
    */
   const handleReturn = (): void => {
      router.reload()
   }

   return (
      <Modal stepsRequired activeStep={activeStep} handleCloseModal={handleCloseModal}
             isOpen={shareModalOpen}
             style={{ overflowY: "scroll" }} totalSteps={totalSteps}>

         {(activeStep === 1 && !adjustData) && <>
            <Heading color="blue" component="h3" size="md">
               Adjust shared data
            </Heading>
            <Text color="800" component="p" size="paragraph">
               You are sharing ({sharedUuids.length}) qualification(s).<br/>
               Please fill out all fields in the template below in
               order
               to share credentials.
            </Text>
            <Button center icon={<svg fill="none" height="21" viewBox="0 0 18 21"
                                      width="18"
                                      xmlns="http://www.w3.org/2000/svg">
               <path d="M9 15C10.0355 15 10.875 14.1605 10.875 13.125C10.875 12.0895 10.0355 11.25 9 11.25C7.96447 11.25 7.125 12.0895 7.125 13.125C7.125 14.1605 7.96447 15 9 15Z"
                  stroke="#0880CE" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="1.5"/>
               <path d="M9 15V17.25" stroke="#0880CE" strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="1.5"/>
               <path d="M16.5 8.25H1.5C1.08579 8.25 0.75 8.58579 0.75 9V19.5C0.75 19.9142 1.08579 20.25 1.5 20.25H16.5C16.9142 20.25 17.25 19.9142 17.25 19.5V9C17.25 8.58579 16.9142 8.25 16.5 8.25Z"
                  stroke="#0880CE" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="1.5"/>
               <path d="M5.625 8.25V4.875C5.625 3.97989 5.98058 3.12145 6.61351 2.48851C7.24645 1.85558 8.10489 1.5 9 1.5C9.89511 1.5 10.7535 1.85558 11.3865 2.48851C12.0194 3.12145 12.375 3.97989 12.375 4.875V8.25"
                  stroke="#0880CE" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="1.5"/>
            </svg>} loading={false}
                    size="lg"
                    type="button"
                    variant="secondary" onClick={(): void => setAdjustData(true)}>
               Adjust shared data
            </Button>
         </>}

         {(activeStep === 2 && !adjustData) && <>
            <Heading color="blue" component="h3" size="md">
               Review your email
            </Heading>
            <Text color="800" component="p" size="paragraph">
               You are sharing ({sharedUuids.length}) qualification(s).<br/>
               Please fill out all fields in the template below in
               order
               to share credentials.
            </Text>
            <EmailShareForm activeStepSetter={setActiveStep} name={name}/>
         </>}

         {(activeStep === 3 && !adjustData) && <>
            <svg fill="none" height="40" style={{ margin: "0 auto 1.2rem", display: "block" }}
                 viewBox="0 0 40 40"
                 width="40" xmlns="http://www.w3.org/2000/svg">
               <rect fill="#16A34A" height="40" rx="10"
                     width="40"/>
               <path d="M10 18.332L17.5 25.832L30 13.332" stroke="white" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="2"/>
            </svg>
            <Heading color="blue" component="h3" size="md">
               Congratulations
            </Heading>
            <Text color="800" component="p" size="paragraph">
               Your credentials have been shared! You now may close this window.
            </Text>
            <Button center loading={false} size="lg"
                    variant="primary"
                    onClick={handleReturn}>
               Return to dashboard
            </Button>
         </>}

         {adjustData && <>
            <Heading color="blue" component="h3" size="md">
               Adjust shared data
            </Heading>
            <Text color="800" component="p" size="paragraph">
               Please review shared data from your authenticated credentials. By default, you share all credential data.
            </Text>
            <div className={styles.selectionChoose}>
               <div className={styles.radio}>
                  <input checked={dataSelection === DataSelectionEnum.ALL} name="all" type="radio"
                         value={DataSelectionEnum.ALL}
                         onChange={handleRadioInputChange}/>
                  <Text color={dataSelection === DataSelectionEnum.ALL ? "800" : "500"} component="p" size="paragraph">
                     Share all credentials
                  </Text>
               </div>
               <div className={styles.radio}>
                  <input checked={dataSelection === DataSelectionEnum.SELECTION} name="selection" type="radio"
                         value={DataSelectionEnum.SELECTION}
                         onChange={handleRadioInputChange}/>
                  <Text color={dataSelection === DataSelectionEnum.SELECTION ? "800" : "500"} component="p"
                        size="paragraph">
                     Share a selection of credentials
                  </Text>
               </div>
            </div>

            {dataSelection === DataSelectionEnum.SELECTION && <ShareModalAdjustData/>}

            <Button center loading={false} size="lg"
                    variant="primary"
                    onClick={handleConfirmData}>
               Confirm shared data
            </Button>
         </>}

      </Modal>
   )
}