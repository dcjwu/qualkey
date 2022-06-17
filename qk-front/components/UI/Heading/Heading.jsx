import PropTypes from "prop-types"

import styles from "./Heading.module.scss"

const Heading = ({ h1, h2, blue, share, success, error, white, loginPage, xxl, medium, modal, children, ...otherProps }) => {
   if (h1) {
      return (
         <h1 {...otherProps} className={`${styles.heading} ${styles.h1}
         ${blue ? styles.blue : ""}
         ${success ? styles.success : ""}
         ${share ? styles.share : ""}
         ${error ? styles.error : ""}
         ${white ? styles.white : ""}
         ${white ? styles.white : ""}
         ${loginPage ? styles.loginPage : ""}
         ${xxl ? styles.xxl : ""}
         ${modal ? styles.modal : ""}`}>
            {children}
         </h1>
      )
   }

   if (h2) return (
      <h2 {...otherProps} className={`${styles.heading} ${styles.h2}
      ${blue ? styles.blue : ""}
      ${success ? styles.success : ""}
      ${error ? styles.error : ""}
      ${white ? styles.white : ""}
      ${medium ? styles.medium : ""}
      ${loginPage ? styles.loginPage : ""}
      ${modal ? styles.modal : ""}`}>
         {children}
      </h2>
   )

   return null
}

export default Heading

Heading.propTypes = {
   h1: PropTypes.bool,
   h2: PropTypes.bool,
   blue: PropTypes.bool,
   share: PropTypes.bool,
   success: PropTypes.bool,
   error: PropTypes.bool,
   white: PropTypes.bool,
   loginPage: PropTypes.bool,
   xxl: PropTypes.bool,
   modal: PropTypes.bool,
}