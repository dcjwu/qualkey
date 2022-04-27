import Link from "next/link"
import PropTypes from "prop-types"

import styles from "./Text.module.scss"

const Text = ({ blue, grey, small, medium, underline, link, error, children }) => {
   if (link) return (
      <Link href={link}>
         <a className={`${styles.text} ${styles.link}
         ${blue ? styles.blue : ""}
         ${grey ? styles.grey : ""}
         ${small ? styles.small : ""}
         ${medium ? styles.medium : ""}
         ${underline ? styles.underline : ""}`}>
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
      ${error ? styles.error : ""}`}>
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
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}
