import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"

import { processingUrl } from "../../../utils"
import { IconLoading } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Input from "../Input/Input"
import Text from "../Text/Text"
import styles from "./Modal.module.scss"

const initialState = { oldPassword: "", password: "", passwordRepeat: "" }

const ChangePasswordModal = () => {
   
   const router = useRouter()

   const [formChangePass, setFormChangePass] = useState(initialState)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [success, setSuccess] = useState(false)

   /**
    * Input value handling
    */
   const handleFormChange = ({ target }) => {
      const { name, value } = target
      setFormChangePass({
         ...formChangePass,
         [name]: value
      })
   }

   /**
    * Submit change password form
    */
   const handleFormSubmitChangePass = async e => {
      e.preventDefault()
      if (formChangePass.password !== formChangePass.passwordRepeat) {
         setError("Password no match")
      } else {
         setLoading(true)
         await axios.post(`${processingUrl}/auth/password-reset`, {
            oldPassword: formChangePass.oldPassword,
            newPassword: formChangePass.password
         }, { withCredentials: true })
            .then(response => {
               setLoading(false)
               if (response.status === 200) {
                  setError("")
                  setFormChangePass(initialState)
                  setSuccess(true)
                  setTimeout(() => {
                     router.reload(window.location.pathname)
                  }, 1000)
               }
            })
            .catch(error => {
               console.log(error)
               setLoading(false)
               setError(error.response.data.message)
            })
      }
   }

   return (
      <div className={styles.modal}>
         <div className={`${styles.wrapper}`} onClick={event => event.stopPropagation()}>
            <div className={`${styles.top}`}>
               <div className={`${styles.wrapperInner} ${styles.password}`}>
                  <Heading blue h2 modal>Change Password</Heading>
                  {error ? <Text error>{error}</Text> : <Text grey>Please set a new password</Text>}
                  <form className={styles.newPassword} onSubmit={handleFormSubmitChangePass}>
                     <Text grey small>Old Password</Text>
                     <Input hideEye inputName="oldPassword" type="password"
                            value={formChangePass.oldPassword} onChange={handleFormChange}/>
                     <Text grey small>New Password</Text>
                     <Input hideEye type="password" value={formChangePass.password}
                            onChange={handleFormChange}/>
                     <Text grey small>Repeat new password</Text>
                     <Input hideEye passwordRepeat type="password"
                            value={formChangePass.passwordRepeat} onChange={handleFormChange}/>
                     <Button blue thin>{
                        loading ? <IconLoading/> : success ? "Success!" : "Change Password"
                     }</Button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ChangePasswordModal