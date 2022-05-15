import { useRouter } from "next/router"
import PropTypes from "prop-types"

import { IconBack } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Heading from "../UI/Heading/Heading"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./AuthForm.module.scss"
import LoginForm from "./FormTypes/LoginForm"

const AuthForms = ({ login, forgot, twoFactor, newPassword, changeFormHandler, submitFormHandler }) => {

   const router = useRouter()

   if (login) return <LoginForm changeFormHandler={changeFormHandler} submitFormHandler={submitFormHandler}/>

   if (forgot) return (
      <div className={`${styles.loginPage} ${styles.forgot}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Forgot password</Heading>
            <form onSubmit={submitFormHandler}>
               <Input email placeholder="Email"/>
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

   if (twoFactor) return (
      <div className={`${styles.loginPage}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Check your email</Heading>
            <Text grey>Enter the 4-digit code we’ve sent to your
               email and then choose your new password</Text>
            <form onSubmit={submitFormHandler}>
               <Input pinCode/>
               <Text error small>Please enter all 4 digits</Text>
               <Button blue bold thin>Next</Button>
               <Text grey>Resend code</Text>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text grey small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text grey small underline
                  link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )

   if (newPassword) return (
      <div className={`${styles.loginPage} ${styles.forgot} ${styles.newPassword}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Set new password</Heading>
            <form onSubmit={submitFormHandler}>
               <Input password placeholder="New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input password placeholder="Confirm New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold thin>Set New Password</Button>
               <Button semiBold thin white
                       onClick={() => router.back()}>
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

export default AuthForms

AuthForms.propTypes = {
   login: PropTypes.bool,
   forgot: PropTypes.bool,
   twoFactor: PropTypes.bool,
   newPassword: PropTypes.bool,
   changeFormHandler: PropTypes.func.isRequired,
   submitFormHandler: PropTypes.func.isRequired
}