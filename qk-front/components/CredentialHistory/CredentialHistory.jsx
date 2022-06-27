import { useState } from "react"

import moment from "moment"

import stylesItem from "../DashboardItem/DashboardItem.module.scss"
import Text from "../UI/Text/Text"
import styles from "./CredentialHistory.module.scss"

const CredentialHistory = ({ data, showCredentialsHistory }) => {

   const [detailsIndex, setDetailsIndex] = useState(0)

   const zip = (a1, a2) => {
      if (a1.length && a2.length) {
         return a1.map((x, i) => [x, a2[i]])
      } else {
         return false
      }
   }

   return (
      <div className={`${stylesItem.historyWrapper} ${stylesItem.student}`} style={{
         display: showCredentialsHistory
            ? "block" : "none", borderRadius: "0 0 15px 15px"
      }}>
         <div className={`${stylesItem.history} ${stylesItem.student}`}>
            <div className={stylesItem.left}>
               <Text bold large>Credentials History</Text>
               <div className={stylesItem.historyItemWrapper}>
                  {data.length !== 1 && data[detailsIndex].changedByUuid
                     ? data.map((item, index) => (
                        item.changedByUuid ? <div key={item.changedAt}
                                                     className={`${styles.historyItem} ${index === detailsIndex ? styles.active : ""}`}
                                                     onClick={() => setDetailsIndex(index)}>
                           <Text grey>{moment(item.changedAt).format("DD.MM.YYYY")}</Text>
                           <Text bold>Credential Change</Text>
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
                        </div> : null
                     )) : <Text grey>No data to show</Text>}
               </div>
            </div>
            {data[detailsIndex].changedByUuid && <div className={stylesItem.right}>
               <Text bold large>Details</Text>
               <div className={styles.detailsItem}>
                  <Text blackSpan>Date: <span>{moment.utc(data[detailsIndex].changedAt).format("DD.MM.YYYY HH:mm")}</span></Text>
                  {!!zip(data[detailsIndex].changedFrom, data[detailsIndex].changedTo) === true
                     ? zip(data[detailsIndex].changedFrom, data[detailsIndex].changedTo).map(item => {
                        return <Text key={item[0]} blackSpan><span>{item[0]}</span> changed
                           to <span>{item[1]}</span></Text>
                     }) : null}
               </div>
            </div>}
         </div>
      </div>
   )
}

export default CredentialHistory