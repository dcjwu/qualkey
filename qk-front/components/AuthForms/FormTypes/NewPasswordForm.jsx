import { useRouter } from "next/router"

import { IconBack } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const NewPasswordForm = () => {
   
   const { back } = useRouter()
   
   return (
      <div className={`${styles.loginPage} ${styles.forgot} ${styles.newPassword}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Set new password</Heading>
            <form>
               <Input placeholder="New Password" type={"password"}/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input placeholder="Confirm New Password" type={"password"}/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold thin>Set New Password</Button>
               <Button semiBold thin white
                       onClick={() => back()}>
                  <div className={styles.buttonRow}>
                     <IconBack/>
                     {/*TODO: PreventDefault!*/}
                     <p>Back to Login</p>
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

export default NewPasswordForm