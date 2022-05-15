import styles from "../Modal/FileUploadModal/FileUploadModal.module.scss"

export const IconClose = ({ ...otherProps }) => {
   return (
      <svg className={styles.close} fill="none" height="46"
           {...otherProps}
           viewBox="0 0 46 46"
           width="46"
           xmlns="http://www.w3.org/2000/svg">
         <path d="M31.1424 31.4853C35.8287 26.799 35.8287 19.201 31.1424 14.5147C26.4561 9.82843 18.8581 9.82843 14.1718 14.5147C9.48551 19.201 9.48551 26.799 14.1718 31.4853C18.8581 36.1716 26.4561 36.1716 31.1424 31.4853Z"
            stroke="#737373" strokeLinecap="round"
            strokeLinejoin="round" strokeWidth="1.5"/>
         <path d="M19.1211 26.5356L26.1922 19.4646" stroke="#737373" strokeLinecap="round"
               strokeLinejoin="round" strokeWidth="1.5"/>
         <path d="M19.1211 19.4644L26.1922 26.5354" stroke="#737373" strokeLinecap="round"
               strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
   )
}