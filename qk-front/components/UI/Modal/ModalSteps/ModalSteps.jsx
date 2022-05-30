import styles from "./ModalSteps.module.scss"

const ModalSteps = ({ step }) => {
   return (
      <div className={styles.wrapper}>
         <span className={`${styles.item} ${step === 1 ? styles.active : ""}`}></span>
         <span className={`${styles.item} ${step === 2 ? styles.active : ""}`}></span>
         <span className={`${styles.item} ${step === 3 ? styles.active : ""}`}></span>
         <span className={`${styles.item} ${step === 4 ? styles.active : ""}`}></span>
      </div>
   )
}

export default ModalSteps