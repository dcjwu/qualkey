import { useState } from "react"

import { IconEmail, IconLinkedinSmall, IconMessage, IconShowDropdown, IconTwitter } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./ContactView.module.scss"

const topics = [
   "Topic 1", "Topic 2", "Topic 3"
]

const ContactView = ({ feedback }) => {
   
   const [showDropdown, setShowDropdown] = useState(false)
   const [activeOption, setActiveOption] = useState("")

   const handleChooseOption = event => {
      setActiveOption(event.target.getAttribute("value"))
      setShowDropdown(false)
   }
   
   return (
      <div className={styles.wrapper}>
         <div className={styles.left}>
            <Text bold>Contact Information</Text>
            <div className={styles.contacts}>
               <a className={styles.contactsItem} href="mailto:info@qualkey.org">
                  <IconEmail/>
                  <Text medium semiBold>info@qualkey.org</Text>
               </a>
               <a className={styles.contactsItem} href="https://twitter.com" rel="noreferrer"
                  target="_blank">
                  <IconTwitter/>
                  <Text medium semiBold>@Qualkey</Text>
               </a>
               <a className={styles.contactsItem} href="https://linkedin.com" rel="noreferrer"
                  target="_blank">
                  <IconLinkedinSmall/>
                  <Text medium semiBold>Qualkey</Text>
               </a>
            </div>
         </div>
         <div className={styles.right}>
            <Text bold>Send us an email message</Text>
            {!feedback
               ? <div className={styles.dropdownWrapper}>
                  <button onClick={() => setShowDropdown(prevState => !prevState)}>
                     <div className={styles.dropdownRow}>
                        <Text semiBold>{!activeOption ? "Select Topic" : activeOption}</Text>
                        <IconShowDropdown/>
                     </div>
                  </button>
                  <div className={styles.dropdownContent} style={{ display: showDropdown ? "block" : "" }}>
                     <ul>
                        {topics.map(item => (
                           <li key={item} value={item} onClick={handleChooseOption}>{item}</li>
                        ))}
                     </ul>
                  </div>
               </div>
               : <Text grey>Your feedback is incredibly important to us as it helps improve service and your experience.</Text>}
            <textarea placeholder="Start typing your message here..."/>
            <Button blue thin>
               <div className={styles.buttonRow}>
                  <IconMessage/>
                  <Text white>Send message</Text>
               </div>
            </Button>
         </div>
      </div>
   )
}

export default ContactView