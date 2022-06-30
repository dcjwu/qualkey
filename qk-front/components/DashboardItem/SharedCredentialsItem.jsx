import { useEffect, useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

import { viewCertificateModalState } from "../../atoms"
import { awsUrl, processingUrl } from "../../utils"
import SharedCredentialsInfo from "../CredentialsInfo/SharedCredentialsInfo"
import { IconAcademicCap, IconCertificate, IconHideDropdownBig, IconShowDropdownBig } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import ViewCertificateModal from "../UI/Modal/ViewCertificateModal"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const SharedCredentialsItem = ({ data }) => {
   
   const router = useRouter()

   const [viewCertificateModal, setViewCertificateModal] = useRecoilState(viewCertificateModalState)
   
   const [showData, setShowData] = useState(false)
   const [certificateData, setCertificateData] = useState({})

   /**
    * Show credential data handler
    */
   const handleExpandData = () => {
      setShowData(prevState => !prevState)
   }

   useEffect(() => {
      axios.get(`${processingUrl}/credential/${data.did}?shareUuid=${router.query.uuid}`)
         .then(response => {
            setCertificateData(response.data)
         })
         .catch(error => {
            console.log(error)
         })
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <>
         <div className={`${styles.wrapper} ${styles.viewWrapper} ${styles.student}`}
              style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.shared}`}
                 style={{ borderRadius: showData ? "15px 15px 0 0" : "15px 15px 15px 15px" }}>
               <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                      objectFit="contain" src={`${awsUrl}/${data.institutionLogoUrl}`} width={196}/>
               <div className={styles.itemWrapper}>
                  <IconAcademicCap/>
                  <div className={styles}>
                     <Text bold>{data.qualificationName}</Text>
                  </div>
               </div>
               <div className={`${styles.actions} ${styles.shared}`}>
                  <IconCertificate onClick={() => setViewCertificateModal(true)}/>
                  <Button blue thin
                          onClick={handleExpandData}>
                     <div className={`${styles.buttonRow} ${styles.shared}`}>
                        {!showData ? <IconHideDropdownBig/> : <IconShowDropdownBig/>}
                        <Text semiBold>Certificate</Text>
                     </div>
                  </Button>
               </div>
            </div>
         </div>
         {showData ? <SharedCredentialsInfo data={data}/> : null}
         {viewCertificateModal && <ViewCertificateModal data={certificateData}/>}
      </>
   )
}

export default SharedCredentialsItem