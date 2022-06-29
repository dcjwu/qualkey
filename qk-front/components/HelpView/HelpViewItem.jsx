import { useState } from "react"

import { IconHideDropdownBig } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./HelpView.module.scss"

const HelpViewItem = ({ item, expandAll }) => {
   
   const [expandOne, setExpandOne] = useState(false)

   const handleExpandOne = () => {
      setExpandOne(prevState => !prevState)
   }
   
   return (
      <div className={styles.contentWrapper}>
         <div className={styles.contentItem} style={{
            borderRadius: expandOne || expandAll ? " 12px 12px 0 0" : "",
            borderBottom: expandOne || expandAll ? "1px solid #d4d4d4" : ""
         }} onClick={handleExpandOne}>
            <Text bold>{item.question}</Text>
            <IconHideDropdownBig style={{ transform: expandOne || expandAll ? "rotate(180deg)" : "" }}/>
         </div>
         <div className={styles.contentInfo}
              style={{ display: expandOne || expandAll ? "block" : "" }}>
            <Text semiBold>{item.answer}</Text>
         </div>
      </div>
   )
}

export default HelpViewItem