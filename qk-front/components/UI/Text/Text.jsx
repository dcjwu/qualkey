import Link from "next/link"
import PropTypes from "prop-types"

import styles from "./Text.module.scss"

const Text = ({ blue, grey, small, medium, underline, link, error, bold, sidebar, sidebarMin, active, children }) => {
   if (link) return (
      <Link href={link}>
         <a className={`${styles.text} ${styles.link}
         ${blue ? styles.blue : ""}
         ${grey ? styles.grey : ""}
         ${small ? styles.small : ""}
         ${medium ? styles.medium : ""}
         ${underline ? styles.underline : ""}
         ${bold ? styles.bold : ""}
         ${sidebar ? styles.sidebar : ""}
         ${sidebarMin ? styles.sidebarMin : ""}
         ${active ? styles.active : ""}`}>
            {children}
         </a>
      </Link>
   )

   return (
      <p className={`${styles.text}
      ${underline ? styles.underline : ""}
      ${blue ? styles.blue : ""}
      ${grey ? styles.grey : ""}
      ${small ? styles.small : ""}
      ${medium ? styles.medium : ""}
      ${underline ? styles.underline : ""}
      ${error ? styles.error + " form-error" : ""}
      ${bold ? styles.bold : ""}
      ${sidebar ? styles.sidebar : ""}
      ${sidebarMin ? styles.sidebarMin : ""}
      ${active ? styles.active : ""}`}>
         {children}
      </p>
   )
}

export default Text

Text.propTypes = {
   blue: PropTypes.bool,
   grey: PropTypes.bool,
   small: PropTypes.bool,
   medium: PropTypes.bool,
   underline: PropTypes.bool,
   link: PropTypes.string,
   error: PropTypes.bool,
   bold: PropTypes.bool,
   sidebar: PropTypes.bool,
   sidebarMin: PropTypes.bool,
   active: PropTypes.bool,
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}
