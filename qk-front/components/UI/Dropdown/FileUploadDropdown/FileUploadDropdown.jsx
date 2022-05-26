import { useState } from "react"

import PropTypes from "prop-types"
import { useRecoilState, useRecoilValue } from "recoil"

import { credentialsState, dropdownSelectionListenerState } from "../../../../atoms"
import { IconShowDropdown, IconX } from "../../_Icon"
import styles from "./FileUploadDropdown.module.scss"
import FileUploadDropdownItem from "./FileUploadDropdownItem"

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

   return (
      <div className={styles.wrapper}>
         <div className={styles.dropdown}>
            <button className={styles.button} disabled={!!optionDropdown} onClick={handleShowDropdown}>
               <span style={{ color: showDropdown ? "#e5e5e5" : "" }}>
                  {optionDropdown ? optionDropdown : "Choose"}
               </span>
               <IconShowDropdown/>
            </button>
            <div className={styles.content} style={{ display: showDropdown ? "block" : "none" }}>
               <ul>
                  {credentialsData.map(data => (
                     <FileUploadDropdownItem key={data.value} data={data} handleChooseOptionDropdown={handleChooseOptionDropdown}/>
                  ))}
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