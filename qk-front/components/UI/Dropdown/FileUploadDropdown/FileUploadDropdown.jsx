import { useEffect, useRef, useState } from "react"

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

   const handleShowDropdown = () => {
      setShowDropdown(prev => !prev)
   }

   /**
    * Allows to choose item from dropdown.
    * @desc Sets innerText of dropdown item to its default and adds value to listener array.
    * @param event Choose option event.
    * @returns Array of chosen values.
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
    * Allows to close dropdown by clicking outside it.
    **/
   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (showDropdown && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setShowDropdown(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [showDropdown])

   return (
      <div className={styles.wrapper}>
         <div className={styles.dropdown}>
            <button className={styles.button} disabled={!!optionDropdown} onClick={handleShowDropdown}>
               <span style={{ color: showDropdown ? "#e5e5e5" : "" }}>
                  {optionDropdown ? optionDropdown : "Choose"}
               </span>
               <IconShowDropdown/>
            </button>
            <div ref={outsideClickRef} className={styles.content} style={{ display: showDropdown ? "block" : "none" }}>
               <ul>
                  {credentialsData.map(credential => {
                     if (requiredMappingFields.includes(credential.value)) {
                        return <li key={credential.value} value={credential.value}
                                   onClick={handleChooseOptionDropdown}>{credential.title}<span>*</span></li>
                     }
                     return <li key={credential.value} value={credential.value}
                                onClick={handleChooseOptionDropdown}>{credential.title}</li>
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