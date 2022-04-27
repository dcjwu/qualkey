import { useRouter } from "next/router"
import PropTypes from "prop-types"

import Button from "../UI/Button/Button"
import Heading from "../UI/Heading/Heading"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./AuthForm.module.scss"

const AuthForm = ({ login, forgot, twoFactor, newPassword }) => {

   const router = useRouter()

   //TODO: Declare state to get all form values on [name]:value and pass it to callback

   if (login) return (
      <div className={styles.loginPage}>
         <div className={styles.wrapper}>
            <Heading blue h1>Login</Heading>
            <form>
               <Input email placeholder="Email"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input password placeholder="Password"/>
               {/*<Text error small>Wrong password</Text>*/}
               <div className={styles.textRow}>
                  <Input checkbox checkboxText="Remember me" inputName="rememberMe"/>
                  <Text blue medium link="/forgot">Forgot Password?</Text>
               </div>
               <Button blue bold thin>Login</Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text grey small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text grey small underline
                  link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )

   if (forgot) return (
      <div className={`${styles.loginPage} ${styles.forgot}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Forgot password</Heading>
            <form>
               <Input email placeholder="Email"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold thin>Send 4-digit code</Button>
               <Button semiBold thin white>
                  <div className={styles.buttonRow}>
                     <svg fill="none" height="24" viewBox="0 0 24 24"
                          width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                           stroke="#4A90D1" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="2"/>
                        <path d="M12 8L8 12L12 16" stroke="#4A90D1" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="2"/>
                        <path d="M16 12H8" stroke="#4A90D1" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="2"/>
                     </svg>
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
            <form>
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
            <form>
               <Input password placeholder="New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input password placeholder="Confirm New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold thin>Set New Password</Button>
               <Button semiBold thin white
                       onClick={() => router.back()}>
                  <div className={styles.buttonRow}>
                     <svg fill="none" height="24" viewBox="0 0 24 24"
                          width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                           stroke="#4A90D1" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="2"/>
                        <path d="M12 8L8 12L12 16" stroke="#4A90D1" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="2"/>
                        <path d="M16 12H8" stroke="#4A90D1" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="2"/>
                     </svg>
                     {/*TODO change this icon and preventDefault!*/}
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

export default AuthForm

AuthForm.propTypes = {
   login: PropTypes.bool,
   forgot: PropTypes.bool,
   twoFactor: PropTypes.bool,
   newPassword: PropTypes.bool
}