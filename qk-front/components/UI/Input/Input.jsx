import { useState } from "react"

import PropTypes from "prop-types"
import { PinInput } from "react-input-pin-code"

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
         <svg fill="none" height="14" viewBox="0 0 20 14"
              width="20" xmlns="http://www.w3.org/2000/svg" onClick={hidePassword}>
            <path clipRule="evenodd"
                  d="M10 0.5C12.6178 0.5 14.972 1.55139 16.6684 2.85335C17.5177 3.50519 18.2146 4.22913 18.7035 4.93368C19.1831 5.6248 19.5 6.3515 19.5 7C19.5 7.6485 19.1831 8.3752 18.7035 9.0663C18.2146 9.7709 17.5177 10.4948 16.6684 11.1466C14.972 12.4486 12.6178 13.5 10 13.5C7.38223 13.5 5.02801 12.4486 3.33162 11.1466C2.48232 10.4948 1.78544 9.7709 1.29649 9.0663C0.81686 8.3752 0.5 7.6485 0.5 7C0.5 6.3515 0.81686 5.6248 1.29649 4.93368C1.78544 4.22913 2.48232 3.50519 3.33162 2.85335C5.02801 1.55139 7.38223 0.5 10 0.5ZM10 3.25C7.92893 3.25 6.25 4.92893 6.25 7C6.25 9.0711 7.92893 10.75 10 10.75C12.0711 10.75 13.75 9.0711 13.75 7C13.75 4.92893 12.0711 3.25 10 3.25ZM10 4.75C11.2426 4.75 12.25 5.7574 12.25 7C12.25 8.2426 11.2426 9.25 10 9.25C8.7574 9.25 7.75 8.2426 7.75 7C7.75 5.7574 8.7574 4.75 10 4.75Z"
                  fill="#C8CBCD"
                  fillRule="evenodd"/>
         </svg>
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
         <input {...otherProps} className={`${styles.fileUpload} ${isFileUploaded ? styles.uploaded : ""}`} id={inputName}
                name={inputName}
                type="file"/>
         <label htmlFor={inputName}>
            <svg fill="none" height="24" viewBox="0 0 25 24"
                 width="25" xmlns="http://www.w3.org/2000/svg">
               <path d="M14.75 3V8.25H20" stroke="#A3A3A3" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
               <path d="M17 21H19.25C19.4489 21 19.6397 20.921 19.7803 20.7803C19.921 20.6397 20 20.4489 20 20.25V8.25L14.75 3H5.75C5.55109 3 5.36032 3.07902 5.21967 3.21967C5.07902 3.36032 5 3.55109 5 3.75V12"
                  stroke="#A3A3A3" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.5"/>
               <path d="M6.65937 15.75H6.125C5.42881 15.75 4.76113 16.0266 4.26884 16.5188C3.77656 17.0111 3.5 17.6788 3.5 18.375C3.5 19.0712 3.77656 19.7389 4.26884 20.2312C4.76113 20.7234 5.42881 21 6.125 21H10.625C11.4408 21 12.2384 20.7581 12.9167 20.3048C13.5951 19.8516 14.1238 19.2073 14.436 18.4536C14.7482 17.6998 14.8299 16.8704 14.6707 16.0703C14.5116 15.2701 14.1187 14.5351 13.5418 13.9582C12.9649 13.3813 12.2299 12.9884 11.4297 12.8293C10.6296 12.6701 9.80018 12.7518 9.04643 13.064C8.29269 13.3762 7.64845 13.9049 7.19519 14.5833C6.74193 15.2616 6.5 16.0592 6.5 16.875"
                  stroke="#A3A3A3" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.5"/>
            </svg>
            <Text white>{fileName ? fileName : "Click to upload a file"}</Text>
         </label>
      </>
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
   isFileUploaded: PropTypes.bool
}