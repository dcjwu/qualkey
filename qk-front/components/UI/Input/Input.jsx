import PropTypes from "prop-types"
import { PinInput } from "react-input-pin-code"

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
   pinValues,
   setPinValues,
   pinError,
   loading,
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
                name={passwordRepeat ? "passwordRepeat" : "password"}
                placeholder={placeholder}
                type="password"/>
         <IconHideInput onClick={hidePassword}/>
      </div>
   )

   if (type === "checkbox") return (
      <div className={styles.checkboxContainer}>
         <input {...otherProps} className={`${styles.checkbox}`}
                name={inputName}
                type="checkbox"/>
         <Text medium>{checkboxText}</Text>
      </div>
   )

   if (type === "text") return (
      inputName !== "password"
         ?       <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                     name={inputName}
                     placeholder={placeholder}
                     type="text"/>
         : <div className={styles.container}>
            <input {...otherProps} className={`${styles.input}
      ${error ? styles.error : ""}`}
                   name={inputName}
                   placeholder={placeholder}
                   type="text"/>
            <IconHideInput onClick={hidePassword}/>
         </div>
   )

   if (type === "pinCode") return (
      <PinInput autoFocus={true}
                containerClassName={`pinCode${pinError ? " error" : ""}${loading ? " loading" : ""}`}
                disabled={false} //TODO: Use this while server request.
                name="pinCode"
                placeholder=""
                size="sm"
                values={pinValues}
                onChange={(value, index, values) => setPinValues(values)}
      />
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
   loading: PropTypes.bool
}