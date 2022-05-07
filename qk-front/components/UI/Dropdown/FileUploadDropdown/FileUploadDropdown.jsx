import { useEffect, useRef, useState } from "react"

import { useRecoilState, useRecoilValue } from "recoil"

import { credentialsState, dropdownSelectionListenerState } from "../../../../atoms"
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
               <svg fill="none" height="20" viewBox="0 0 20 20"
                    width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#262626" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2"/>
               </svg>
            </button>
            <div ref={outsideClickRef} className={styles.content} style={{ display: showDropdown ? "block" : "none" }}>
               <ul>
                  {credentialsData.map(credential => (
                     <li key={credential.value} value={credential.value}
                         onClick={handleChooseOptionDropdown}>{credential.title}</li>
                  ))}
               </ul>
            </div>
         </div>
         <svg fill="none" height="10" style={{ pointerEvents: optionDropdown ? "" : "none" }}
              viewBox="0 0 9 10"
              width="9"
              xmlns="http://www.w3.org/2000/svg" onClick={() => {
                 resetDropdown(valueIndex)
                 setOptionDropdown("")
              }}>
            <path d="M1.12109 8.53516L8.19216 1.46409" stroke="#737373" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: optionDropdown ? "" : "#96999c" }}/>
            <path d="M1.12109 1.46484L8.19216 8.53591" stroke="#737373" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: optionDropdown ? "" : "#96999c" }}/>
         </svg>
      </div>
   )
}

FileUploadDropdown.displayName = "FileUploadDropdown"

export default FileUploadDropdown