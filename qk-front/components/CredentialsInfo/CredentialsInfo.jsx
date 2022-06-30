import moment from "moment"
import PropTypes from "prop-types"

import { IconVerified } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./CredentialsInfo.module.scss"

const CredentialsInfo = ({ data }) => {
   return (
      <>
         <div className={styles.tab}>
            <Text large>Credential Information</Text>
         </div>
         <div className={styles.wrapper}>
            <div className={styles.info}>
               <div className={styles.infoWrapper}>
                  <div className={styles.infoBlock}>
                     <div className={styles.infoItem}>
                        <Text grey>Authenticated by:</Text>
                        <Text semiBold>{data.authenticatedBy}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Authenticated title:</Text>
                        <Text semiBold>{data.authenticatedTitle}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Date authenticated:</Text>
                        <Text semiBold>{moment.utc(data.authenticatedDate).format("DD/MM/YYYY")}</Text>
                     </div>
                  </div>
                  <div className={styles.infoBlock}>
                     <div className={styles.infoItem}>
                        <Text grey>Awarding institution:</Text>
                        <Text semiBold>{data.awardingInstitution}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Name of qualification:</Text>
                        <Text semiBold>{data.qualificationName}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Level of qualification:</Text>
                        <Text semiBold>{data.qualificationLevel}</Text>
                     </div>
                  </div>
                  <div className={styles.infoBlock}>
                     <div className={styles.infoItem}>
                        <Text grey>Award level:</Text>
                        <Text semiBold>{data.awardLevel}</Text>
                     </div>
                  </div>
               </div>
               <div className={styles.right}>
                  <div className={styles.infoBlock}>
                     <div className={styles.infoItem}>
                        <Text grey>Student name:</Text>
                        <Text semiBold>{data.graduatedName}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Study start date:</Text>
                        <Text semiBold>{moment.utc(data.studyStartedAt).format("DD/MM/YYYY")}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Study end date:</Text>
                        <Text semiBold>{moment.utc(data.studyEndedAt).format("DD/MM/YYYY")}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Graduation date:</Text>
                        <Text semiBold>{moment.utc(data.graduatedAt).format("DD/MM/YYYY")}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Language of study:</Text>
                        <Text semiBold>{data.studyLanguage}</Text>
                     </div>
                  </div>
                  <div className={styles.infoBlock}>
                     <div className={styles.infoItem}>
                        <Text grey>Credentials expiry date:</Text>
                        <Text semiBold>{moment.utc(data.expiresAt).format("DD/MM/YYYY")}</Text>
                     </div>
                     <div className={styles.infoItem}>
                        <Text grey>Other information:</Text>
                        <Text semiBold>{data.info}</Text>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.bottom}>
               <div className={styles.bottomItemLeft}>
                  <div className={styles.bottomItem}>
                     <Text lightBlue semiBold>Certificate ID:</Text>
                     <Text>{data?.hash}</Text>
                  </div>
                  <div className={styles.bottomItem}>
                     <Text lightBlue semiBold>Hedera Blockchain ID:</Text>
                     <Text>{data.did}</Text>
                  </div>
               </div>
               <Button blue thin>
                  <div className={styles.buttonRow}>
                     <IconVerified/>
                     <Text semiBold white>Verify ID</Text>
                  </div>
               </Button>
            </div>
         </div>
      </>
   )
}

export default CredentialsInfo

CredentialsInfo.propTypes = { data: PropTypes.object.isRequired }