import moment from "moment"
import PropTypes from "prop-types"

import { IconCircleBlue, IconCircleGrey, IconCircleRed } from "../../UI/_Icon"
import Text from "../../UI/Text/Text"
import styles from "./NotificationsItem.module.scss"

const NotificationsItem = ({ data }) => {
   
   const checkNotificationType = () => {
      const { type } = data
      if (type === "system") return <IconCircleBlue/>
      if (type === "withdrawal") return <IconCircleRed/>
      if (type === "expiration") return <IconCircleGrey/>
   }
   
   return (
      <div className={styles.wrapper}>
         <div className={styles.left}>
            {checkNotificationType()}
            <div>
               <Text medium semiBold>{data.title}</Text>
               <Text medium>{`${data.text.slice(0, 40).trim()}...`}</Text>
            </div>
         </div>
         <Text grey medium>{moment(data.date * 1000).format("DD/MM/YYYY")}</Text>
      </div>
   )
}

export default NotificationsItem

NotificationsItem.propTypes = { data: PropTypes.object }