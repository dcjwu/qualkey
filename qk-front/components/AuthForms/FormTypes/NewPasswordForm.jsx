import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import { repeatPasswordState } from "../../../atoms"
import { IconBack, IconLoading } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const NewPasswordForm = ({ formChangeHandler, formSubmitHandler, buttonError, loading }) => {

   const { push } = useRouter()

   const inputState = useRecoilValue(repeatPasswordState)

   return (
      <div className={`${styles.loginPage} ${styles.forgot} ${styles.newPassword}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Set new password</Heading>
            <form onSubmit={formSubmitHandler}>
               <Input placeholder="New Password" type={"password"} value={inputState.password}
                      onChange={formChangeHandler}/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input passwordRepeat placeholder="Confirm New Password" type={"password"}
                      value={inputState.passwordRepeat}
                      onChange={formChangeHandler}/>
               {/*<Text error small>Wrong email</Text>*/}
               {buttonError ? <Button bold error thin>{buttonError}</Button> : <Button blue bold thin>{loading ? <IconLoading/> : "Set New Password"}</Button>}
               <Button semiBold thin white
                       onClick={() => push("/")}>
                  <div className={styles.buttonRow}>
                     <IconBack/>
                     <p>Back to Login</p>
                  </div>
               </Button> {/*TODO: REMOVE FROM HERE!*/}
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