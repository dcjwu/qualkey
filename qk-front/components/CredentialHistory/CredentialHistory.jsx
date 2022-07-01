import { useEffect, useState } from "react"

import axios from "axios"
import moment from "moment"

import { processingUrl } from "../../utils"
import stylesItem from "../DashboardItem/DashboardItem.module.scss"
import { IconArrowLeft } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./CredentialHistory.module.scss"

const CredentialHistory = ({ changeData, uuid, showCredentialsHistory }) => {

   const [activeValue, setActiveValue] = useState({ index: 0, type: "" })
   const [historyData, setHistoryData] = useState([])

   const zip = (a1, a2) => {
      if (a1.length && a2.length) {
         return a1.map((x, i) => [x, a2[i]])
      } else {
         return false
      }
   }

   useEffect(() => {
      if (showCredentialsHistory) {
         axios.get(`${processingUrl}/credential/share?credentialUuid=${uuid}`,
            { withCredentials: true })
            .then(response => {
               const newData = [...response.data, ...changeData].sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt)
               })
               setHistoryData(newData)
            })
            .catch(error => {
               console.log(error)
            })
      }
   }, [showCredentialsHistory])

   const checkExpiration = expiresAt => {
      const dateNow = moment(new Date(Date.now()).toUTCString())
      const dateExpires = moment(expiresAt)
      return dateExpires.diff(dateNow) > 0
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
                  {historyData.map((item, index) => {
                     if (item["sharedBy"]) {
                        return <div key={item.uuid}
                                    className={`${styles.historyItem} ${index === activeValue.index ? styles.active : ""}`}
                                    onClick={() => setActiveValue({ index: index, type: "sharedBy" })}>
                           <Text grey>{moment(item.createdAt).format("DD.MM.YYYY")}</Text>
                           <Text bold>Credential Share</Text>
                           <IconArrowLeft/>
                        </div>
                     } else if (item["changedByUuid"]) {
                        return <div key={item.id}
                                    className={`${styles.historyItem} ${index === activeValue.index ? styles.active : ""}`}
                                    onClick={() => setActiveValue({ index: index, type: "changedByUuid" })}>
                           <Text grey>{moment(item.createdAt).format("DD.MM.YYYY")}</Text>
                           <Text bold>Credential Change</Text>
                           <IconArrowLeft/>
                        </div>
                     }
                  })}
               </div>
            </div>
            {historyData.length > 1
               ? <div className={stylesItem.right}>
                  <Text bold large>Details</Text>
                  <div className={styles.detailsItem}>
                     <Text blackSpan>Date:&nbsp;
                        <span>{moment.utc(historyData[activeValue.index].createdAt).format("DD.MM.YYYY HH:mm")}</span>
                     </Text>
                     {!!historyData[activeValue.index].changedByUuid === true
                        ? zip(historyData[activeValue.index].changedFrom, historyData[activeValue.index].changedTo).map(item => {
                           return <div>
                              <Text key={item[0]} blackSpan><span>{item[0]}</span> changed
                                 to <span>{item[1]}</span></Text>
                           </div>
                        })
                        : !!historyData[activeValue.index].sharedBy === true
                           ? <>
                              <div>
                                 {checkExpiration(historyData[activeValue.index].expiresAt)
                                    ? <Text semiBold success>Link Active</Text> : <Text error semiBold>Link Expired</Text>}
                              </div>
                              <div className={styles.emails}>
                                 <Text grey>Shared with:</Text>
                                 {historyData[activeValue.index].recipientEmails.map(item => {
                                    return <Text key={item}>{item}</Text>
                                 })}
                              </div>
                              <div className={styles.shares}>
                                 <Text grey>Shared credentials:</Text>
                                 {historyData[activeValue.index].credentialQualificationNames.map(item => {
                                    return <Text key={item} semiBold>{item}</Text>
                                 })}
                              </div>
                           </>
                           : null}
                  </div>
               </div>
               : null}
         </div>
      </div>
   )
}

export default CredentialHistory