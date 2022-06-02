import styles from "../components/DashboardItem/DashboardItem.module.scss"

export const validateStatusStyles = (status, isStudent = false) => {
   if (status === "ACTIVATED") return !isStudent ? styles.activated : `${styles.activated} ${styles.student}`
   if (status === "NEW" || status === "UPLOADING_TO_BLOCKCHAIN") return !isStudent ? styles.new : `${styles.new} ${styles.student}`
   if (status === "UPLOADED_TO_BLOCKCHAIN") return !isStudent ? styles.uploaded : `${styles.uploaded} ${styles.student}`
   if (status === "WITHDRAWN") return !isStudent ? styles.withdrawn : `${styles.withdrawn} ${styles.student}`
   if (status === "EXPIRED") return !isStudent ? styles.expired : `${styles.expired} ${styles.student}`
}