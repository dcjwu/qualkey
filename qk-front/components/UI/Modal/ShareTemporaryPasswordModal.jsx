import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Input from "../Input/Input"
import Text from "../Text/Text"
import styles from "./Modal.module.scss"

const ShareTemporaryPasswordModal = ({ handlePassword, temporaryPassword, handleFormSubmit }) => {
   return (
      <div className={styles.modal}>
         <div className={`${styles.wrapper}`} onClick={event => event.stopPropagation()}>
            <div className={`${styles.top}`}>
               <div className={`${styles.wrapperInner} ${styles.password}`}>
                  <Heading blue h2 modal>Password</Heading>
                  <Text grey>Please enter temporary password sent to your email.</Text>
                  <form className={styles.passwordForm} onSubmit={handleFormSubmit}>
                     <Input hideEye type="password" value={temporaryPassword}
                            onChange={handlePassword}/>
                     <Button blue thin>Enter</Button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShareTemporaryPasswordModal