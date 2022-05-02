import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"

import { formValidationErrorsState, loadingState, loginFormState } from "../../../atoms"
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
                     ? <svg fill="#fff" height="30" viewBox="0 0 120 30"
                            width="60" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15">
                           <animate attributeName="r" begin="0s" calcMode="linear"
                                    dur="0.8s" from="15"
                                    repeatCount="indefinite" to="15"
                                    values="15;9;15"/>
                           <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
                                    dur="0.8s" from="1"
                                    repeatCount="indefinite" to="1"
                                    values="1;.5;1"/>
                        </circle>
                        <circle cx="60" cy="15" fillOpacity="0.3"
                                r="9">
                           <animate attributeName="r" begin="0s" calcMode="linear"
                                    dur="0.8s" from="9"
                                    repeatCount="indefinite" to="9"
                                    values="9;15;9"/>
                           <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
                                    dur="0.8s" from="0.5"
                                    repeatCount="indefinite" to="0.5"
                                    values=".5;1;.5"/>
                        </circle>
                        <circle cx="105" cy="15" r="15">
                           <animate attributeName="r" begin="0s" calcMode="linear"
                                    dur="0.8s" from="15"
                                    repeatCount="indefinite" to="15"
                                    values="15;9;15"/>
                           <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
                                    dur="0.8s" from="1"
                                    repeatCount="indefinite" to="1"
                                    values="1;.5;1"/>
                        </circle>
                     </svg>
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