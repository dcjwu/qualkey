import PropTypes from "prop-types"

import styles from "./Button.module.scss"

const Button = ({ thin, wide, bold, semiBold, blue, white, loading, errorModal, children, ...otherProps }) => {
   return (
      <button {...otherProps} className={`${styles.btn}
         ${thin ? styles.thin : ""}
         ${wide ? styles.wide : ""}
         ${bold ? styles.bold : ""}
         ${semiBold ? styles.semiBold : ""}
         ${blue ? styles.blue : ""}
         ${white ? styles.white : ""}
         ${loading ? styles.loading : ""}
         ${errorModal ? styles.errorModal : ""}`}>
         {children}
      </button>
   )
}

export default Button

Button.propTypes = {
   thin: PropTypes.bool,
   wide: PropTypes.bool,
   bold: PropTypes.bool,
   semiBold: PropTypes.bool,
   blue: PropTypes.bool,
   white: PropTypes.bool,
   loading: PropTypes.bool,
   errorModal: PropTypes.bool,
   children: PropTypes.any
}