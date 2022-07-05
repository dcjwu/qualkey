import { useState } from "react"

import PropTypes from "prop-types"
import { useRecoilState, useRecoilValue } from "recoil"

import { credentialsState, dropdownSelectionListenerState } from "../../../../atoms"
import { requiredMappingFields } from "../../../../utils"
import { IconShowDropdown, IconX } from "../../_Icon"
import styles from "./FileUploadDropdown.module.scss"

const FileUploadDropdown = ({ handleOption, valueIndex, resetDropdown }) => {

   const credentialsData = useRecoilValue(credentialsState)
   const [showDropdown, setShowDropdown] = useState(false)
   const [optionDropdown, setOptionDropdown] = useState("")
   const [dropdownSelectionListener, setDropdownSelectionListener] = useRecoilState(dropdownSelectionListenerState)

   /**
    * Dropdown activation handler
    */
   const handleShowDropdown = event => {
      event.stopPropagation()
      setShowDropdown(prev => !prev)
   }

   /**
    * Allows to choose item from dropdown.
    **/
   const handleChooseOptionDropdown = event => {
      setShowDropdown(false)
      setOptionDropdown(event.target.innerText)
      setDropdownSelectionListener([
         ...dropdownSelectionListener, event.target.getAttribute("value")
      ])
      handleOption(event, valueIndex)
   }

   /**
    * Check if passed value is required one
    */
   const checkValue = value => {
      for (let i = 0; i < requiredMappingFields.length; i++) {
         if (requiredMappingFields[i] === value) return true
      }
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.dropdown}>
            <button className={styles.button} disabled={!!optionDropdown} onClick={handleShowDropdown}>
               <span style={{ color: showDropdown ? "#e5e5e5" : "" }}>
                  {optionDropdown ? optionDropdown : "Choose"}
               </span>
               {!optionDropdown ? <IconShowDropdown/> : null}
            </button>
            <div className={styles.content} style={{ display: showDropdown ? "block" : "none" }}>
               <ul>
                  {credentialsData.map(data => {
                     return <li key={data.value} style={{ color: checkValue(data.value) ? "#05558a" : null }} value={data.value}
                                onClick={handleChooseOptionDropdown}>{data.title}</li>
                  })}
               </ul>
            </div>
         </div>
         <IconX optionDropdown={optionDropdown} style={{ pointerEvents: optionDropdown ? "" : "none" }} onClick={() => {
            resetDropdown(valueIndex)
            setOptionDropdown("")
         }}/>
      </div>
   )
}

export default FileUploadDropdown

FileUploadDropdown.propTypes = {
   handleOption: PropTypes.func.isRequired,
   valueIndex: PropTypes.number.isRequired,
   resetDropdown: PropTypes.func.isRequired
}