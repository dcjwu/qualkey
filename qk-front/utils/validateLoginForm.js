export const validateLoginForm = (formData, formDataCb, initialValues ) => {
   const email = formData?.email.trim()
   const password = formData?.password.trim()

   const errors = {}
   const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (email !== undefined) {
      if (!email) {
         errors.email = "Email cannot be blank"
      } else if (!emailRegex.test(email)) {
         errors.email = "Email format is not valid"
      }
   }
   if (password !== undefined) {
      if (!password) {
         errors.password = "Password cannot be blank"
      }
   }
   if (Object.keys(errors).length) return errors
   else {
      formDataCb(initialValues)
      return true
   }
}