import { useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { paymentCredentialsState, viewCertificateModalState } from "../../atoms"
import { awsUrl, processingUrl, validateStatus, validateStatusStyles } from "../../utils"
import { IconAcademicCap, IconCertificate, IconInfo, IconLoading, IconWarning } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import HoverInfo from "../UI/HoverInfo/HoverInfo"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const StudentViewCredentialsItem = ({ data }) => {

   const { push, query } = useRouter()

   const [, setViewCertificateModal] = useRecoilState(viewCertificateModalState)
   const [, setCredentialsData] = useRecoilState(paymentCredentialsState)
   const [loading, setLoading] = useState(false)

   /**
    * View certificate handler
    */
   const handleViewCertificate = () => {
      setViewCertificateModal(true)
   }

   /**
    * Stripe payment handler
    */
   const handlePaymentRequest = async id => {
      setLoading(true)
      const { graduatedName, qualificationName } = data
      setCredentialsData({ graduatedName, qualificationName })
      await axios.post(`${processingUrl}/payment`,
         { credentialUuids: [id] },
         { withCredentials: true })
         .then(response => {
            setLoading(false)
            push(response.data)
         })
         .catch(error => {
            setLoading(false)
            console.log(error)
         })
   }

   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper} ${styles.student}`}
           style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.student}`}
              style={{ borderRadius: "15px 15px 15px 15px" }}>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={`${awsUrl}/${data.institution.logoUrl}`} width={196}/>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{data.qualificationName}</Text>
               </div>
            </div>

            <div className={`${styles.status} ${loading ? styles.loading : ""} ${validateStatusStyles(data.status, true)}`}
               onClick={data.status === "UPLOADED_TO_BLOCKCHAIN" ? () => handlePaymentRequest(query.uuid) : null}>
               {data.status === "UPLOADED_TO_BLOCKCHAIN"
                  ? loading
                     ? <IconLoading/>
                     : <>
                        <div className={styles.iconWrapper}>
                           <IconWarning/>
                           <HoverInfo status={data.status}/>
                        </div>
                        <Text bold>{validateStatus(data.status, true)}</Text>
                     </>
                  : <>
                     <div className={styles.iconWrapper}>
                        <IconInfo/>
                        <HoverInfo status={data.status}/>
                     </div>
                     <Text bold>{validateStatus(data.status, true)}</Text>
                  </>}
            </div>
            <div className={styles.actions}>
               <Button blue thin disabled={data.status !== "ACTIVATED"}
                       onClick={handleViewCertificate}>
                  <div className={styles.buttonRow}>
                     <IconCertificate/>
                     <Text semiBold>Certificate</Text>
                  </div>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default StudentViewCredentialsItem

StudentViewCredentialsItem.propTypes = { data: PropTypes.object.isRequired }