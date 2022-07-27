import Text from "../Text/Text"
import styles from "./HoverInfo.module.scss"

const HoverInfo = ({ status, actions, institution, isActivated, institutionExpand, institutionUuid, ...otherProps }) => {

   return (
      <div className={`${styles.wrapper} ${actions ? styles.actions : ""} ${institutionExpand ? styles.institutionExpand : ""} ${institutionUuid ? styles.institutionUuid : ""}`} {...otherProps}>
         {status === "UPLOADED_TO_BLOCKCHAIN"
            ?
            <Text>{!institution
               ? "Please submit your payment in order to activate credentials"
               : "Credentials have been uploaded. Ready to be activated by the student"}</Text>
            : status === "ACTIVATED"
               ? <Text>Credentials have been
                  activated and are ready for use</Text>
               : status === "WITHDRAWN"
                  ? <Text>{!institution ?
                     "Your certification has been withdrawn. Please contact your awarding institution"
                     : "Certification has been withdrawn by the institution"}</Text>
                  : status === "EXPIRED"
                     ? <Text>{!institution ? "Your certification has expired. Please contact your awarding" +
                        " institution"
                        : "Certification expired"}</Text>
                     : status === "UPLOADING_TO_BLOCKCHAIN"
                        ? <Text>{!institution ? "Your certification was just uploaded. Please wait upload to" +
                           " blockchain."
                           : "Credentials data has been uploaded to QualKey. Blockchain upload is now being" +
                           " processed"}</Text>
                        : status === "SHARE"
                           ? <Text>{isActivated ? "Share your credentials" : "Credentials are not active"}</Text>
                           : status === "VIEW"
                              ? <Text>View credentials</Text>
                              : status === "EXPAND"
                                 ? <Text>Expand credential history</Text>
                                 : status === "VIEW_SHARE"
                                    ? <Text>View and share your certificate</Text>
                                    : status === "HEDERA"
                                       ? <Text>Find out more about verification in our Help & FAQ section.</Text>
                                       : null}
      </div>
   )
}

export default HoverInfo