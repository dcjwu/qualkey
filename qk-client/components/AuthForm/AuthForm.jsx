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
                  <Text blue medium link="/auth/forgot">Forgot Password?</Text>
               </div>
               <Button blue bold wide>Login</Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text small underline link="/terms">Terms & Conditions</Text>
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
               <Button blue bold wide>Send 4-digit code</Button>
               <Button semiBold thin white
                       onClick={() => router.back()}>
                  <div className={styles.buttonRow}>
                     <svg fill="#4a90d1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M360 224L272 224v-56c0-9.531-5.656-18.16-14.38-22C248.9 142.2 238.7 143.9 231.7 150.4l-96 88.75C130.8 243.7 128 250.1 128 256.8c.3125 7.781 2.875 13.25 7.844 17.75l96 87.25c7.031 6.406 17.19 8.031 25.88 4.188s14.28-12.44 14.28-21.94l-.002-56L360 288C373.3 288 384 277.3 384 264v-16C384 234.8 373.3 224 360 224zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/>
                     </svg>
                     {/*TODO change this icon and preventDefault!*/}
                     <p>Back</p>
                  </div>
               </Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text small underline link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )

   if (twoFactor) return (
      <div className={`${styles.loginPage}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Check your email</Heading>
            <Text>Enter the 4-digit code we’ve sent to your
               email and then choose your new password</Text>
            <form>
               <Input text inputName="2faCode" placeholder="4 digit code"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold wide>Set New Password</Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text small underline link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )

   if (newPassword) return (
      <div className={`${styles.loginPage} ${styles.forgot}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Set new password</Heading>
            <form>
               <Input password placeholder="New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Input password  placeholder="Confirm New Password"/>
               {/*<Text error small>Wrong email</Text>*/}
               <Button blue bold wide>Set New Password</Button>
               <Button semiBold thin white
                       onClick={() => router.back()}>
                  <div className={styles.buttonRow}>
                     <svg fill="#4a90d1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M360 224L272 224v-56c0-9.531-5.656-18.16-14.38-22C248.9 142.2 238.7 143.9 231.7 150.4l-96 88.75C130.8 243.7 128 250.1 128 256.8c.3125 7.781 2.875 13.25 7.844 17.75l96 87.25c7.031 6.406 17.19 8.031 25.88 4.188s14.28-12.44 14.28-21.94l-.002-56L360 288C373.3 288 384 277.3 384 264v-16C384 234.8 373.3 224 360 224zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/>
                     </svg>
                     {/*TODO change this icon and preventDefault!*/}
                     <p>Back</p>
                  </div>
               </Button>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text small underline link="/terms">Terms & Conditions</Text>
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