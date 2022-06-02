import { useEffect, useRef } from "react"

import PropTypes from "prop-types"

import { IconTrash } from "../../UI/_Icon"
import Text from "../../UI/Text/Text"
import NotificationsItem from "../NotificationsItem/NotificationsItem"
import styles from "./NotificationWrapper.module.scss"

const NotificationWrapper = ({ show, setShow, notificationsData }) => {

   /**
    * Allows to close window by clicking outside
    */
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
   }, [show]) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div ref={outsideClickRef} className={styles.wrapper} style={{ display: show ? "block" : "none", height: notificationsData.length ? "30rem" : "" }}>
         <div className={styles.top}>
            <Text bold large>Notifications</Text>
            <IconTrash/>
         </div>
         {!notificationsData.length ? <Text grey>Empty</Text> : null}
         <div>
            {notificationsData.map(item => (
               <NotificationsItem key={item.id} data={item}/>
            ))}
         </div>
      </div>
   )
}

export default NotificationWrapper

NotificationWrapper.displayName = "NotificationWrapper"

NotificationWrapper.propTypes = { show: PropTypes.bool, setShow: PropTypes.func, notificationsData: PropTypes.array }