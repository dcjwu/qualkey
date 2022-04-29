import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-xl.png"
import { formValidationErrorsState, initialLoginFormState, loadingState, loginFormState } from "../atoms"
import AuthForms from "../components/AuthForms/AuthForms"
import Heading from "../components/UI/Heading/Heading"
import { processingUrl, validate } from "../utils"

export default function Home() {

   const router = useRouter()

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [, setFormError] = useRecoilState(formValidationErrorsState)
   const [, setLoading] = useRecoilState(loadingState)

   const handleFormChange = ({ target }) => {
      const { name, value, type, checked } = target
      if (type !== "checkbox") {
         setFormData({
            ...formData,
            [name]: value
         })
      } else {
         setFormData({
            ...formData,
            [name]: checked
         })
      }
   }

   const handleFormSubmit = async event => {
      event.preventDefault()
      setFormError({})

      const validation = validate(formData, setFormData, initialLoginFormState)
      if (Object.keys(validation).length) {
         setFormError(validation)
      } else {
         setLoading(true)
         await axios.post(`${processingUrl}/auth/login`, formData, { withCredentials: true })
            .then(response => {
               router.push(response.data)
               setLoading(false)
            })
            .catch(error => {
               setLoading(false)
               if (error.response.data.message.includes("Role")) {
                  setFormError({ response: "Not authorized" })
               } else {
                  setFormError({ response: error.response.data.message })
               }
            })
      }
   }

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForms login changeFormHandler={handleFormChange} submitFormHandler={handleFormSubmit}/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image priority alt="Qualkey" layout="fill"
                            src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}