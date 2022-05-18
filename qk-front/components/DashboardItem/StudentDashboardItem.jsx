import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import { credentialsDetailsState, credentialsShowDetailsState } from "../../atoms"
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
   const { diploma, status } = data

   const { pathname } = useRouter()

   const validateStatus = () => {
      if (status === "Activated") return `${styles.activated} ${styles.student}`
      if (status === "Withdrawn") return `${styles.withdrawn} ${styles.student}`
      if (status === "Expired") return `${styles.expired} ${styles.student}`
      if (status === "Activate Credentials") return `${styles.activateCredentials} ${styles.student}`
   }

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
            <Input checkboxSolo disabled={status !== "Activated"} type="checkbox"/>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={schoolLogo} width={196}/>
            <div className={`${styles.itemWrapper} ${status === "Expired" ? styles.expired : ""}`}>
               <IconAcademicCap/>
               {/*<Text>{`${diploma.slice(0, 27).trim()}...`}</Text>*/}
               <Text semiBold>{diploma}</Text>
            </div>
            <div className={`${styles.status} ${validateStatus()}`}>
               {status === "Activate Credentials"
                  ? <>
                     <IconWarning/>
                     <Text bold>{status}</Text>
                  </>
                  : <>
                     <IconInfo/>
                     <Text bold>{status}</Text>
                  </>}
            </div>
            <div className={`${styles.actions} ${styles.student}`}>
               <IconShare/>
               <Link passHref href={`${pathname}/credentials-view`}>
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