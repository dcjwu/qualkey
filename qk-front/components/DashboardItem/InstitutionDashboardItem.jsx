import { useEffect, useState } from "react"

import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

import avatar from "../../assets/images/avatarMock.webp"
import { validateStatus, validateStatusStyles } from "../../utils"
import CredentialHistory from "../CredentialHistory/CredentialHistory"
import { IconAcademicCap, IconHideDropdownBig, IconInfo, IconOpenViewPage, IconShowDropdownBig } from "../UI/_Icon"
import HoverInfo from "../UI/HoverInfo/HoverInfo"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const InstitutionDashboardItem = ({ data }) => {

   const { pathname, query } = useRouter()
   const [showCredentialsHistory, setShowCredentialsHistory] = useState(false)

   /**
    * Credential history dropdown handling.
    **/
   const handleShowDropdown = () => {
      setShowCredentialsHistory(prevState => !prevState)
   }

   useEffect(() => {
      setShowCredentialsHistory(false)
   }, [query.filter])

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
               <Text>{`${data.qualificationName.length > 36 ? data.qualificationName.slice(0, 35).trim() + "..." : data.qualificationName}`}</Text>
            </div>
            <div className={`${styles.status} ${validateStatusStyles(data.status)}`}>
               <div className={styles.iconWrapper}>
                  <IconInfo/>
                  <HoverInfo institution status={data.status}/>
               </div>
               <Text bold>{validateStatus(data.status)}</Text>
            </div>
            <Text bold>{moment.utc(data.updatedAt).format("HH:mm DD/MM/YYYY")}</Text>
            <div className={styles.actions}>
               <div className={styles.iconWrapper}>
                  <Link passHref href={`${pathname}/${data.uuid}`}>
                     <a>
                        <IconOpenViewPage/>
                        <HoverInfo institution institutionUuid isActivated={data.status === "ACTIVATED"}
                                   status="VIEW"
                                   style={{ width: "20rem", textAlign: "center", top: "-5rem", left: "0" }}/>
                     </a>
                  </Link>
               </div>
               {
                  showCredentialsHistory
                     ? <IconShowDropdownBig onClick={handleShowDropdown}/>
                     : <div className={styles.iconWrapper}>
                        <IconHideDropdownBig onClick={handleShowDropdown}/>
                        <HoverInfo actions institution institutionExpand
                                   status="EXPAND"
                                   style={{ width: "20rem", textAlign: "center", top: "-5rem", left: "-6rem" }}/>
                     </div>
               }
            </div>
         </div>
         <CredentialHistory changeData={data.credentialChanges} showCredentialsHistory={showCredentialsHistory}/>
      </div>
   )
}

export default InstitutionDashboardItem

InstitutionDashboardItem.propTypes = { data: PropTypes.object.isRequired }