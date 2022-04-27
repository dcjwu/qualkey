import PropTypes from "prop-types"

import styles from "./Heading.module.scss"

const Heading = ({ h1, h2, blue, white, loginPage, children }) => {
   if (h1) {
      return (
         <h1 className={`${styles.heading} ${styles.h1}
         ${blue ? styles.blue : ""}
         ${white ? styles.white : ""}
         ${loginPage ? styles.loginPage : ""}`}>
            {children}
         </h1>
      )
   }

   if (h2) return (
      <h2 className={`${styles.heading} ${styles.h2}
      ${blue ? styles.blue : ""}
      ${white ? styles.white : ""}
      ${loginPage ? styles.loginPage : ""}`}>
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
   white: PropTypes.bool,
   loginPage: PropTypes.bool,
   children: PropTypes.string.isRequired
}