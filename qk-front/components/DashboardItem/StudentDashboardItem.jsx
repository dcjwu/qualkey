import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import { credentialsDetailsState, credentialsShowDetailsState } from "../../atoms"
import { validateStatus, validateStatusStyles } from "../../utils"
import StudentDetailsItem from "../DetailsItem/StudentDetailsItem"
import StudentHistoryItem from "../HistoryItem/StudentHistoryItem"
import { IconAcademicCap, IconHideDropdownBig, IconInfo, IconOpenViewPage, IconShare, IconShowDropdownBig, IconWarning } from "../UI/_Icon"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const mockDataHistory = [
   {
      date: 1652174960,
      details: {
         sharedWith: "email@asf.com",
         status: "Link Expired",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      details: {
         sharedWith: "email@asf.com",
         status: "Active",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      details: {
         sharedWith: "email@adfgfdsf.com",
         status: "Link Expired",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      details: {
         sharedWith: "emdsfgdfsail@asf.com",
         status: "Active",
         date: 1652174960
      }
   }
]

const StudentDashboardItem = ({ data }) => {

   const { pathname } = useRouter()

   const showDetails = useRecoilValue(credentialsShowDetailsState)
   const details = useRecoilValue(credentialsDetailsState)
   const [showCredentialsHistory, setShowCredentialsHistory] = useState(false)

   const handleShowDropdown = () => {
      if (showCredentialsHistory) {
         setShowCredentialsHistory(false)
      } else {
         setShowCredentialsHistory(true)
      }
   }

   return (
      <div className={styles.wrapper} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.student}`} style={{
            borderRadius: !showCredentialsHistory
               ? "15px 15px 15px 15px"
               : "15px 15px 0 0"
         }}>
            <Input checkboxSolo disabled={data.status !== "ACTIVATED"} type="checkbox"/>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={schoolLogo} width={196}/>
            <div className={`${styles.itemWrapper} ${data.status === "EXPIRED" ? styles.expired : ""}`}>
               <IconAcademicCap/>
               <Text semiBold>{data.qualificationName}</Text>
            </div>
            <div className={`${styles.status} ${validateStatusStyles(data.status, true)}`}>
               {data.status === "UPLOADED_TO_BLOCKCHAIN"
                  ? <>
                     <IconWarning/>
                     <Text bold>{validateStatus(data.status, true)}</Text>
                  </>
                  : <>
                     <IconInfo/>
                     <Text bold>{validateStatus(data.status, true)}</Text>
                  </>}
            </div>
            <div className={`${styles.actions} ${styles.student}`}>
               <IconShare/>
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
         <div style={{ display: showCredentialsHistory ? "block" : "none", borderRadius: "0 0 15px 15px" }}>
            <div className={styles.history}>
               <div className={styles.left}>
                  <Text bold large>Credentials History</Text>
                  <div className={styles.historyItemWrapper}>
                     {mockDataHistory.map((data, index) => (
                        <StudentHistoryItem key={index} data={data}/>
                     ))}
                  </div>
               </div>
               <div className={styles.right}>
                  <Text bold large>Details</Text>
                  <div className={styles.rightWrapper}>
                     {showDetails && <StudentDetailsItem data={details}/>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default StudentDashboardItem