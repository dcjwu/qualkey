import { useState } from "react"

import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"

import avatar from "../../assets/images/avatarMock.webp"
import { credentialsDetailsState, credentialsShowDetailsState } from "../../atoms"
import { validateStatus, validateStatusStyles } from "../../utils"
import InstitutionDetailsItem from "../DetailsItem/InstitutionDetailsItem"
import InstitutionHistoryItem from "../HistoryItem/InstitutionHistoryItem"
import { IconAcademicCap, IconHideDropdownBig, IconInfo, IconOpenViewPage, IconShowDropdownBig } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const mockDataHistory = [
   {
      date: 1652174960,
      action: "Credentials Uplo",
      details: {
         action: "Credentials Uploaded or maybe not",
         status: "Success",
         registrar: "Mr. Michael Cainekjhlkj",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials Uploaded",
      details: {
         action: "Credentials Uploaded",
         status: "Success ksjdfh",
         registrar: "Mr. Michael Caine de Cisse",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials Uploaded",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials lkjlkj",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   }
]

const InstitutionDashboardItem = ({ data }) => {

   const { pathname } = useRouter()

   const showDetails = useRecoilValue(credentialsShowDetailsState)
   const details = useRecoilValue(credentialsDetailsState)
   const [showCredentialsHistory, setShowCredentialsHistory] = useState(false)

   /**
    * Credential history dropdown handling.
    **/
   const handleShowDropdown = () => {
      if (showCredentialsHistory) {
         setShowCredentialsHistory(false)
      } else {
         setShowCredentialsHistory(true)
      }
   }

   //TODO: If possible make scroll to center when dropdown open.

   console.log(data)

   return (
      <div className={styles.wrapper} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={styles.credentialWrapper} style={{
            borderRadius: !showCredentialsHistory
               ? "15px 15px 15px 15px"
               : "15px 15px 0 0"
         }}>
            <div className={styles.itemWrapper}>
               <Image alt="portrait" className={styles.photo} height={50}
                      quality={100} src={avatar} width={50}/>
               <Text bold>{data.graduatedName}</Text>
            </div>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <Text>{`${data.qualificationName.slice(0, 35).trim()}...`}</Text>
            </div>
            <div className={`${styles.status} ${validateStatusStyles(data.status)}`}>
               <IconInfo/>
               <Text bold>{validateStatus(data.status)}</Text>
            </div>
            <Text bold>{moment.utc(data.updatedAt).format("HH:mm DD/MM/YYYY")}</Text>
            <div className={styles.actions}>
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
         <div className={styles.historyWrapper} style={{
            display: showCredentialsHistory
               ? "block" : "none", borderRadius: "0 0 15px 15px"
         }}>
            <div className={styles.history}>
               <div className={styles.left}>
                  <Text bold large>Credentials History</Text>
                  <div className={styles.historyItemWrapper}>
                     {mockDataHistory.map((data, index) => (
                        <InstitutionHistoryItem key={index} data={data}/>
                     ))}
                  </div>
               </div>
               <div className={styles.right}>
                  <Text bold large>Details</Text>
                  <div className={styles.rightWrapper}>
                     {showDetails && <InstitutionDetailsItem data={details}/>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstitutionDashboardItem

InstitutionDashboardItem.propTypes = { data: PropTypes.object.isRequired }