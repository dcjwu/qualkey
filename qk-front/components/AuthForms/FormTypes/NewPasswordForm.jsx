import { useState } from "react"

import { useRouter } from "next/router"
import PropTypes from "prop-types"
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
   const [showPassword, setShowPassword] = useState(false)
   const [showRepeatPassword, setShowRepeatPassword] = useState(false)

   return (
      <div className={`${styles.loginPage} ${styles.forgot} ${styles.newPassword}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Set new password</Heading>
            <Text>Please set a new password that is going to be used from now on.</Text>
            <form onSubmit={formSubmitHandler}>
               <Input hidePassword={() => setShowPassword(prevState => !prevState)} inputName="password"
                      placeholder="New Password" type={!showPassword ? "password" : "text"}
                      value={inputState.password}
                      onChange={formChangeHandler}/>
               <Input hidePassword={() => setShowRepeatPassword(prevState => !prevState)} inputName="repeatPassword"
                      placeholder="Repeat New Password" type={!showRepeatPassword ? "password" : "text"}
                      value={inputState.passwordRepeat}
                      onChange={formChangeHandler}/>
               {buttonError && <Text error small>{buttonError}</Text>}
               <Button blue bold thin>{loading ? <IconLoading/> : "Set New Password"}</Button>
            </form>
            <Button semiBold thin white
                    onClick={() => push("/")}>
               <div className={styles.buttonRow}>
                  <IconBack/>
                  <p>Back</p>
               </div>
            </Button>
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

NewPasswordForm.propTypes = {
   formChangeHandler: PropTypes.func,
   formSubmitHandler: PropTypes.func,
   buttonError: PropTypes.string,
   loading: PropTypes.bool,
}