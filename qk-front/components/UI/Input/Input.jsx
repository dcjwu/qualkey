import { useState } from "react"

import PropTypes from "prop-types"
import { PinInput } from "react-input-pin-code"

import { IconFileUpload, IconHideInput } from "../_Icon"
import Text from "../Text/Text"
import styles from "./Input.module.scss"

const Input = ({
   email,
   password,
   checkbox,
   text,
   fileUpload,
   pinCode,
   inputName,
   passwordRepeat,
   placeholder,
   error,
   hidePassword,
   checkboxText,
   fileName,
   isFileUploaded,
   search,
   ...otherProps
}) => {

   const [pinValues, setPinValues] = useState(["", "", "", ""]) //TODO: Move it to parent component :)

   if (email) return (
      <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
             name="email"
             placeholder={placeholder}
             type="email"/>
   )

   if (password) return (
      <div className={styles.container}>
         <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                name={passwordRepeat ? "passwordRepeat" : "password"}
                placeholder={placeholder}
                type="password"/>
         <IconHideInput onClick={hidePassword}/>
      </div>
   )

   if (checkbox) return (
      <div className={styles.checkboxContainer}>
         <input {...otherProps} className={`${styles.checkbox}`}
                name={inputName}
                type="checkbox"/>
         <Text medium>{checkboxText}</Text>
      </div>
   )

   if (text) return (
      <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
             name={inputName}
             placeholder={placeholder}
             type="text"/>
   )

   if (pinCode) return (
      <PinInput autoFocus={true}
                containerClassName="pinCode" //TODO: Add .error for error scenario.
                disabled={false} //TODO: Use this while server request.
                name="pinCode"
                placeholder=""
                size="sm"
                values={pinValues}
                onChange={(value, index, values) => setPinValues(values)}
      />
   )

   if (fileUpload) return (
      <>
         <input {...otherProps} className={`${styles.fileUpload} ${isFileUploaded ? styles.uploaded : ""}`}
                id={inputName}
                name={inputName}
                type="file"/>
         <label htmlFor={inputName}>
            <IconFileUpload/>
            <Text white>{fileName ? fileName : "Click to upload a file"}</Text>
         </label>
      </>
   )

   if (search) return (
      <input {...otherProps} className={`${styles.input} ${styles.search}`}
             name={inputName}
             placeholder="Search"
             type="text"/>
   )
}

export default Input

Input.propTypes = {
   email: PropTypes.bool,
   password: PropTypes.bool,
   checkbox: PropTypes.bool,
   text: PropTypes.bool,
   fileUpload: PropTypes.bool,
   pinCode: PropTypes.bool,
   inputName: PropTypes.string,
   passwordRepeat: PropTypes.bool,
   placeholder: PropTypes.string,
   error: PropTypes.bool,
   hidePassword: PropTypes.func,
   checkboxText: PropTypes.string,
   fileName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
   isFileUploaded: PropTypes.bool,
   search: PropTypes.bool
}