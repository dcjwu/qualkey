import moment from "moment"
import PropTypes from "prop-types"

import Text from "../UI/Text/Text"
import styles from "./DetailsItem.module.scss"

const InstitutionDetailsItem = ({ data }) => {
   return (
      <div className={styles.detailsItem}>
         <Text blackSpan>Action: <span>{data.action}</span></Text>
         <Text blackSpan>Status: <span>{data.status}</span></Text>
         <Text blackSpan>Registered by: <span>{data.registrar}</span></Text>
         <Text blackSpan>Date: <span>{moment.utc(data.date * 1000).format("DD.MM.YYYY")}</span></Text>
      </div>
   )
}

export default InstitutionDetailsItem

InstitutionDetailsItem.propTypes = { data: PropTypes.object.isRequired }