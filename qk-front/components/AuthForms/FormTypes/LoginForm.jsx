import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"

import { formValidationErrorsState, loadingState, loginFormState } from "../../../atoms"
import { IconLoading } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const LoginForm = ({ submitFormHandler, changeFormHandler }) => {

   const formError = useRecoilValue(formValidationErrorsState)
   const loginForm = useRecoilValue(loginFormState)
   const loading = useRecoilValue(loadingState)

   return (
      <div className={styles.loginPage}>
         <div className={styles.wrapper}>
            <Heading blue h1>Login</Heading>
            {formError.response && <Text error small>{formError.response}</Text>}
            <form onSubmit={submitFormHandler}>
               <Input email placeholder="Email" value={loginForm.email}
                      onChange={changeFormHandler}/>
               {formError.email && <Text error small>{formError.email}</Text>}
               <Input password placeholder="Password" value={loginForm.password}
                      onChange={changeFormHandler}/>
               {formError.password && <Text error small>{formError.password}</Text>}
               <div className={styles.textRow}>
                  <Input checkbox checkboxText="Remember me" inputName="rememberMe"
                         value={loginForm.rememberMe}
                         onChange={changeFormHandler}/>
                  <Text blue medium link="/forgot">Forgot Password?</Text>
               </div>
               <Button blue bold loading
                       thin
                       disabled={loading}
                       type="submit">
                  {loading
                     ? <IconLoading/>
                     : <p>Login</p>
                  }
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

LoginForm.propTypes = {
   submitFormHandler: PropTypes.func.isRequired,
   changeFormHandler: PropTypes.func.isRequired
}

export default LoginForm