import Text from "../Text/Text"
import styles from "./HoverInfo.module.scss"

const HoverInfo = ({ status, ...otherProps }) => {
   return (
      <div className={styles.wrapper} {...otherProps}>
         {status === "UPLOADED_TO_BLOCKCHAIN"
            ? <Text>Please submit your payment
               in order to activate credentials</Text>
            : status === "ACTIVATED"
               ? <Text>Your credentials have been
                  activated and are ready to be used.</Text>
               : status === "WITHDRAWN"
                  ? <Text>Your certification has been withdrawn.
                     Please contact your awarding institution. </Text>
                  : status === "EXPIRED"
                     ? <Text>Your certification has expired.
                        Please contact your awarding institution. </Text>
                     : status === "UPLOADING_TO_BLOCKCHAIN"
                        ? <Text>Your certification was just uploaded. Please wait upload to blockchain.</Text>
                        : status === "SHARE"
                           ? <Text>Share your credentials</Text>
                           : status === "VIEW"
                              ? <Text>View your credentials</Text>
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