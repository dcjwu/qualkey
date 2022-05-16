import moment from "moment"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { showEditCredentialsState } from "../../../atoms"
import { IconAcademicCap, IconAcademicCapPerson, IconEdit, IconInfo } from "../../UI/_Icon"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionItem.module.scss"

const InstitutionViewCredentialsItem = ({ data }) => {
   const { diploma, lastModified, status, student } = data

   const [, setShowEditCredentials] = useRecoilState(showEditCredentialsState)

   const validateStatus = () => {
      if (status === "Activated") return styles.activated
      if (status === "Uploaded") return styles.uploaded
      if (status === "Withdrawn") return styles.withdrawn
      if (status === "Expired") return styles.expired
   }
   
   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.itemWrapper} ${styles.viewName}`}>
               <IconAcademicCapPerson/>
               <div>
                  <Text bold>{student}</Text>
               </div>
            </div>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{diploma}</Text>
               </div>
            </div>
            <div className={`${styles.status} ${validateStatus()}`}>
               <IconInfo/>
               <Text bold>{status}</Text>
            </div>
            <Text bold>{moment(lastModified * 1000).format("hh:mm DD/MM/YYYY")}</Text>
            <div className={`${styles.actions} ${styles.viewActions}`}>
               <IconEdit onClick={() => setShowEditCredentials(true)}/>
            </div>
         </div>
      </div>
   )
}

export default InstitutionViewCredentialsItem

InstitutionViewCredentialsItem.propTypes = { data: PropTypes.object.isRequired }