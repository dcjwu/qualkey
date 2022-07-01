import { useEffect, useState } from "react"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { formShareState, paymentCredentialsState, showShareModalState } from "../../atoms"
import { awsUrl, processingUrl, validateStatus, validateStatusStyles } from "../../utils"
import CredentialHistory from "../CredentialHistory/CredentialHistory"
import { IconAcademicCap, IconHideDropdownBig, IconInfo, IconLoading, IconOpenViewPage, IconShare, IconShowDropdownBig, IconWarning } from "../UI/_Icon"
import HoverInfo from "../UI/HoverInfo/HoverInfo"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const StudentDashboardItem = ({ data, deleteCredentialToShare, handleCredentialsToShare }) => {

   const { pathname, push, query } = useRouter()

   const [, setShowShareModal] = useRecoilState(showShareModalState)
   const [formShare, setFormShare] = useRecoilState(formShareState)
   const [, setCredentialsData] = useRecoilState(paymentCredentialsState)
   const [showCredentialsHistory, setShowCredentialsHistory] = useState(false)
   const [loading, setLoading] = useState(false)

   /**
    * Credential history dropdown handling.
    **/
   const handleShowDropdown = () => {
      setShowCredentialsHistory(prevState => !prevState)
   }

   /**
    *
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

   /**
    * Input share handler
    */
   const handleInputShareChange = ({ target }) => {
      if (target.checked) {
         handleCredentialsToShare(data.uuid)
      } else {
         deleteCredentialToShare(data.uuid)
      }
   }

   /**
    * Shows share modal
    */
   const handleShowShareModal = () => {
      setShowShareModal(true)
      setFormShare([
         ...formShare, data.uuid
      ])
   }

   useEffect(() => {
      setShowCredentialsHistory(false)
   }, [query.filter])

   return (
      <div className={`${styles.wrapper} ${styles.student}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.student}`} style={{
            borderRadius: !showCredentialsHistory
               ? "15px 15px 15px 15px"
               : "15px 15px 0 0"
         }}>
            <Input checkboxSolo disabled={data.status !== "ACTIVATED"} type="checkbox"
                   onChange={handleInputShareChange}/>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={`${awsUrl}/${data.institution.logoUrl}`} width={196}/>
            <div className={`${styles.itemWrapper} ${data.status === "EXPIRED" ? styles.expired : ""}`}>
               <IconAcademicCap/>
               <Text semiBold>{data.qualificationName}</Text>
            </div>
            <div className={`${styles.status} ${loading ? styles.loading : ""} ${validateStatusStyles(data.status, true)} ${styles.student}`}
               onClick={data.status === "UPLOADED_TO_BLOCKCHAIN" ? () => handlePaymentRequest(data.uuid) : null}>
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
            <div className={`${styles.actions} ${styles.student}`}>
               <IconShare onClick={handleShowShareModal}/>
               <Link passHref href={`${pathname}/${data.uuid}`}>
                  <a>
                     <IconOpenViewPage/>
                  </a>
               </Link>
               {
                  showCredentialsHistory
                     ? <IconShowDropdownBig onClick={handleShowDropdown}/>
                     : <IconHideDropdownBig onClick={handleShowDropdown}/>
               }
            </div>
         </div>
         <CredentialHistory changeData={data.credentialChanges} showCredentialsHistory={showCredentialsHistory}
                            uuid={data.uuid}/>
      </div>
   )
}

export default StudentDashboardItem

StudentDashboardItem.propTypes = { data: PropTypes.object.isRequired }