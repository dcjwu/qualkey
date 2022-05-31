import Text from "../Text/Text"
import styles from "./HoverInfo.module.scss"

const HoverInfo = ({ status }) => {
   return (
      <div className={styles.wrapper}>
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
                        ? <Text>Your credentials were just uploaded. Please, wait.</Text>
                        : null}
      </div>
   )
}

export default HoverInfo