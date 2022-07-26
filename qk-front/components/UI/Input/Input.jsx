import PropTypes from "prop-types"

import { IconFileUpload, IconHideInput } from "../_Icon"
import Text from "../Text/Text"
import styles from "./Input.module.scss"

const Input = ({
   type,
   inputName,
   passwordRepeat,
   placeholder,
   error,
   hidePassword,
   checkboxText,
   fileName,
   isFileUploaded,
   checkboxSolo,
   hideEye,
   ...otherProps
}) => {
   
   if (type === "email") return (
      <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
             name="email"
             placeholder={placeholder}
             type="email"/>
   )

   if (type === "password") return (
      <div className={styles.container}>
         <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                name={passwordRepeat ? "passwordRepeat" : inputName ? inputName : "password"}
                placeholder={placeholder}
                type="password"/>
         {!hideEye && <IconHideInput onClick={hidePassword}/>}
      </div>
   )

   if (type === "checkbox") return (
      <div className={styles.checkboxContainer}>
         <input {...otherProps} className={`${styles.checkbox}`}
                name={inputName}
                type="checkbox"/>
         {!checkboxSolo && <Text medium>{checkboxText}</Text>}
      </div>
   )
   
   if (type === "text") return (
      inputName === "password"
         ? <div className={styles.container}>
            <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                   name={inputName}
                   placeholder={placeholder}
                   type="text"/>
            <IconHideInput onClick={hidePassword}/>
         </div>
         : inputName === "repeatPassword"
            ? <div className={styles.container}>
               <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                      name={inputName}
                      placeholder={placeholder}
                      type="text"/>
               <IconHideInput onClick={hidePassword}/>
            </div>
            : <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                  name={inputName}
                  placeholder={placeholder}
                  type="text"/>
   )

   if (type === "fileUpload") return (
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

   if (type === "search") return (
      <input {...otherProps} className={`${styles.input} ${styles.search}`}
             name={inputName}
             placeholder="Search"
             type="text"/>
   )

   if (type === "number") return (
      <input {...otherProps} className={`${styles.input}`}
             name={inputName}
             placeholder={placeholder}
             type="number"/>
   )
}

export default Input

Input.propTypes = {
   type: PropTypes.string.isRequired,
   inputName: PropTypes.string,
   passwordRepeat: PropTypes.bool,
   placeholder: PropTypes.string,
   error: PropTypes.bool,
   hidePassword: PropTypes.func,
   checkboxText: PropTypes.string,
   fileName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
   isFileUploaded: PropTypes.bool,
   pinValues: PropTypes.array,
   setPinValues: PropTypes.func,
   pinError: PropTypes.bool,
   loading: PropTypes.bool,
   checkboxSolo: PropTypes.bool,
   hideEye: PropTypes.bool
}