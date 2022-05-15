import { IconBack } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const ForgotForm = () => {
   return (
      <div className={`${styles.loginPage} ${styles.forgot}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Forgot password</Heading>
            <form>
               <Input placeholder="Email" type={"email"}/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold thin>Send 4-digit code</Button>
               <Button semiBold thin white>
                  <div className={styles.buttonRow}>
                     <IconBack/>
                     {/*TODO: PreventDefault!*/}
                     <p>Back</p>
                  </div>
               </Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text grey small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text grey small underline
                  link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )
}

export default ForgotForm