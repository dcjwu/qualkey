import moment from "moment"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { credentialsDetailsState, credentialsShowDetailsState } from "../../atoms"
import Text from "../UI/Text/Text"
import styles from "./HistoryItem.module.scss"

const StudentHistoryItem = ({ data }) => {
   const { date, details } = data

   const [, setShowDetails] = useRecoilState(credentialsShowDetailsState)
   const [, setDetails] = useRecoilState(credentialsDetailsState)

   /**
    * Shows details in credential history.
    **/
   const handleShowDetails = () => {
      setShowDetails(true)
      setDetails(details)
   }

   //TODO: Manage state so only one item is chosen
   
   return (
      <div className={styles.historyItem} /*style={{ backgroundColor: activeHistory ? "#f5f5f5" : "" }}*/ onClick={handleShowDetails}>
         <Text grey>{moment(date * 1000).format("DD.MM.YYYY")}</Text>
         <Text blackSpan>Shared with: <span>{details.sharedWith}</span></Text>
         <svg fill="none" height="17" viewBox="0 0 16 17"
              width="16" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_462_14165)">
               <path d="M2.5416 0.613091L8.26348 7.43809C8.43223 7.66666 8.50098 7.88094 8.50098 8.06309C8.50098 8.24523 8.43163 8.49059 8.29198 8.65559L2.5416 15.5127C2.25723 15.8554 1.7541 15.8666 1.48223 15.5384C1.18145 15.2125 1.17166 14.6677 1.45977 14.3274L6.71348 8.06309L1.46348 1.7988C1.17538 1.45952 1.18516 0.913805 1.48594 0.587734C1.7541 0.25952 2.25723 0.270234 2.5416 0.613091Z"
                     fill="#737373"/>
            </g>
            <defs>
               <clipPath id="clip0_462_14165">
                  <rect fill="white" height="16" transform="translate(0 16.0635) rotate(-90)"
                        width="16"/>
               </clipPath>
            </defs>
         </svg>
      </div>
   )
}

export default StudentHistoryItem

StudentHistoryItem.propTypes = { data: PropTypes.object.isRequired }