import Link from "next/link"
import PropTypes from "prop-types"

import styles from "./Text.module.scss"

const Text = ({ blue, grey, white, small, medium, underline, link, error, success, bold, sidebar, sidebarMin, active, modal, children, ...otherProps }) => {
   if (link) return (
      <Link href={link}>
         <a className={`${styles.text} ${styles.link}
         ${blue ? styles.blue : ""}
         ${grey ? styles.grey : ""}
         ${white ? styles.white : ""}
         ${small ? styles.small : ""}
         ${medium ? styles.medium : ""}
         ${underline ? styles.underline : ""}
         ${bold ? styles.bold : ""}
         ${sidebar ? styles.sidebar : ""}
         ${sidebarMin ? styles.sidebarMin : ""}
         ${active ? styles.active : ""}
         ${modal ? styles.modal : ""}`}>
            {children}
         </a>
      </Link>
   )

   return (
      <p {...otherProps} className={`${styles.text}
      ${underline ? styles.underline : ""}
      ${blue ? styles.blue : ""}
      ${grey ? styles.grey : ""}
      ${white ? styles.white : ""}
      ${small ? styles.small : ""}
      ${medium ? styles.medium : ""}
      ${underline ? styles.underline : ""}
      ${error ? styles.error + " form-error" : ""}
      ${success ? styles.success + " form-error" : ""}
      ${bold ? styles.bold : ""}
      ${sidebar ? styles.sidebar : ""}
      ${sidebarMin ? styles.sidebarMin : ""}
      ${active ? styles.active : ""}
      ${modal ? styles.modal : ""}`}>
         {children}
      </p>
   )
}

export default Text

Text.propTypes = {
   blue: PropTypes.bool,
   grey: PropTypes.bool,
   white: PropTypes.bool,
   small: PropTypes.bool,
   medium: PropTypes.bool,
   underline: PropTypes.bool,
   link: PropTypes.string,
   error: PropTypes.bool,
   success: PropTypes.bool,
   bold: PropTypes.bool,
   sidebar: PropTypes.bool,
   sidebarMin: PropTypes.bool,
   active: PropTypes.bool,
   modal: PropTypes.bool,
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}
