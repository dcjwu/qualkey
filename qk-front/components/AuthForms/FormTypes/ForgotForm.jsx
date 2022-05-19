import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import { forgotFormState, formValidationErrorsState, loadingState } from "../../../atoms"
import { IconBack, IconLoading } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const ForgotForm = ({ changeFormHandler, submitFormHandler, buttonError }) => {

   const { push } = useRouter()

   const inputState = useRecoilValue(forgotFormState)
   const formError = useRecoilValue(formValidationErrorsState)
   const loading = useRecoilValue(loadingState)

   return (
      <div className={`${styles.loginPage} ${styles.forgot}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Forgot password</Heading>
            <form onSubmit={submitFormHandler}>
               <Input placeholder="Email" type={"email"} value={inputState.email}
                      onChange={changeFormHandler}/>
               {formError.email && <Text error small>{formError.email}</Text>}
               {buttonError ? <Button bold error thin>{buttonError}</Button> : <Button blue bold thin
                                                                                       disabled={loading}>
                  {loading
                     ? <IconLoading style={{ height: 15 }}/>
                     : <p>Send 4-digit code</p>
                  }
               </Button>}
               <Button semiBold thin white
                       onClick={() => push("/")}>
                  <div className={styles.buttonRow}>
                     <IconBack/>
                     <p>Back</p>
                  </div>
               </Button>
               {/*TODO: REMOVE FROM HERE!*/}
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