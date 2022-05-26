import moment from "moment"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { showEditCredentialsState } from "../../atoms"
import { validateStatus, validateStatusStyles } from "../../utils"
import { IconAcademicCap, IconAcademicCapPerson, IconEdit, IconInfo } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const InstitutionViewCredentialsItem = ({ data }) => {

   const [, setShowEditCredentials] = useRecoilState(showEditCredentialsState)
   
   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.itemWrapper} ${styles.viewName}`}>
               <IconAcademicCapPerson/>
               <div>
                  <Text bold>{data.graduatedName}</Text>
               </div>
            </div>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{data.qualificationName}</Text>
               </div>
            </div>
            <div className={`${styles.status} ${validateStatusStyles(data.status)} ${styles.viewStatus}`}>
               <IconInfo/>
               <Text bold>{validateStatus(data.status)}</Text>
            </div>
            <Text bold>{moment.utc(data.updatedAt).format("HH:mm DD/MM/YYYY")}</Text>
            <div className={`${styles.actions} ${styles.viewActions}`}>
               <IconEdit onClick={() => setShowEditCredentials(true)}/>
            </div>
         </div>
      </div>
   )
}

export default InstitutionViewCredentialsItem

InstitutionViewCredentialsItem.propTypes = { data: PropTypes.object.isRequired }