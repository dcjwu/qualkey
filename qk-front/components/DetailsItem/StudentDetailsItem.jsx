import moment from "moment"

import Text from "../UI/Text/Text"
import styles from "./DetailsItem.module.scss"

const StudentDetailsItem = ({ data }) => {

   //TODO: Add reshare functionality from design

   return (
      <div className={styles.detailsItem}>
         <Text blackSpan>Shared with: <span>{data.sharedWith}</span></Text>
         <div className={styles.rowWrapper}>
            <Text blackSpan>Date: <span>{moment(data.date * 1000).format("DD.MM.YYYY")}</span></Text>
            {data.status === "Link Expired" ? <Text error>{data.status}</Text> : <Text success>{data.status}</Text>}
         </div>
      </div>
   )
}

export default StudentDetailsItem