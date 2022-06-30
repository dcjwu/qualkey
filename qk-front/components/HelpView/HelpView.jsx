import { useState } from "react"

import { helpData } from "../../utils"
import Text from "../UI/Text/Text"
import styles from "./HelpView.module.scss"
import HelpViewItem from "./HelpViewItem"

const buttons = [
   { text: "all questions", value: "" },
   { text: "for students", value: "student" },
   { text: "for educators", value: "educator" },
   { text: "for employers", value: "employer" }
]

const HelpView = () => {

   const [expandAll, setExpandAll] = useState(false)
   const [filter, setFilter] = useState("")

   const handleExpandAll = () => {
      setExpandAll(prevState => !prevState)
   }
   
   const handleFilter = filter => {
      setFilter(filter)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.top}>
            <div className={styles.buttons}>
               {buttons.map(item => (
                  <button key={item.value} className={filter === item.value ? styles.active : ""} onClick={() => handleFilter(item.value)}>{item.text}</button>
               ))}
            </div>
            <div className={styles.expand}>
               <Text semiBold>Expand All</Text>
               <input checked={expandAll} className={styles.radio} name="shareAll"
                      type="checkbox" value="shareAll" onChange={handleExpandAll}/>
            </div>
         </div>
         <div className={styles.content}>
            {!filter
               ? helpData.map(item => (
                  <HelpViewItem key={item.question} expandAll={expandAll} item={item}/>
               ))
               : helpData.filter(item => item.category === filter).map(item => (
                  <HelpViewItem key={item.question} expandAll={expandAll} item={item}/>
               ))}
         </div>
      </div>
   )
}

export default HelpView