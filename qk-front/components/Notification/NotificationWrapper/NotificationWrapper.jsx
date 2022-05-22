import { useEffect, useRef } from "react"

import PropTypes from "prop-types"

import { IconTrash } from "../../UI/_Icon"
import Text from "../../UI/Text/Text"
import NotificationsItem from "../NotificationsItem/NotificationsItem"
import styles from "./NotificationWrapper.module.scss"

const mockNotificationData = [
   {
      id: 1,
      type: "withdrawal",
      title: "Credential Withdrawn",
      text: "MA Art History, Curatorship and Renaissance Culture",
      date: 1652112363
   },
   {
      id: 2,
      type: "expiration",
      title: "Credential Expired",
      text: "MA Art History, Curatorship and Renaissance Culture",
      date: 1652112363
   },
   {
      id: 3,
      type: "system",
      title: "Please Approve Uploaded Credentials",
      text: "Your colleague has uploaded new credentials that require approval",
      date: 1652112363
   },
]

const NotificationWrapper = ({ show, setShow }) => {

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (show && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setShow(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [show])

   return (
      <div ref={outsideClickRef} className={styles.wrapper} style={{ display: show ? "block" : "none" }}>
         <div className={styles.top}>
            <Text bold large>Notifications</Text>
            <IconTrash/>
         </div>
         <div>
            {mockNotificationData.map(item => (
               <NotificationsItem key={item.id} data={item}/>
            ))}
         </div>
      </div>
   )
}

export default NotificationWrapper

NotificationWrapper.displayName = "NotificationWrapper"

NotificationWrapper.propTypes = { show: PropTypes.bool }