import { useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

import avatar from "../../assets/images/avatarMock.webp"
import { processingUrl } from "../../utils"
import { IconAccount, IconChangePass, IconCheckMark, IconCurrency, IconLoading, IconSecurity, IconShowDropdown } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./SettingsView.module.scss"

const changePassInitialState = { oldPassword: "", password: "", passwordRepeat: "" }

const currencies = [
   { currency: "GBP", name: "British Pound" },
   { currency: "USD", name: "US Dollar" },
   { currency: "EUR", name: "Euro" }
]

const SettingsView = ({ institution, userData }) => {

   const router = useRouter()

   const { fullName, email } = userData

   const [view, setView] = useState(1)
   const [formChangePass, setFormChangePass] = useState(changePassInitialState)
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)
   const [currencyDropdownShow, setCurrencyDropdownShow] = useState(false)
   const [currencyDropdownValue, setCurrencyDropdownValue] = useState(userData.currency)

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
                  setFormChangePass(changePassInitialState)
                  setSuccess(true)
               }
            })
            .catch(error => {
               console.log(error)
               setLoading(false)
               setError(error.response.data.message)
            })
      }
   }

   /**
    * Sets particular for according to flow
    */
   const viewSetter = value => {
      setView(value)
      setError("")
      setSuccess(false)
      setFormChangePass(changePassInitialState)
   }

   /**
    * Show dropdown handler
    */
   const handleShowCurrencyDropdown = () => {
      setCurrencyDropdownShow(prevState => !prevState)
   }

   /**
    * Check currency helper function
    */
   const checkCurrency = value => {
      if (value === "GBP") return "British Pound"
      if (value === "USD") return "US Dollar"
      if (value === "EUR") return "Euro"
   }

   /**
    * Currency option handler
    */
   const handleCurrencyOption = event => {
      setCurrencyDropdownValue(event.target.getAttribute("value"))
      setCurrencyDropdownShow(false)
   }

   /**
    * Submit currency change
    */
   const handleCurrencyChangeRequest = async () => {
      await axios.patch(`${processingUrl}/user/setting`, {
         settingName: "currency",
         newValue: currencyDropdownValue
      }, { withCredentials: true })
         .then(response => {
            setLoading(false)
            if (response.status === 200) {
               setError("")
               setSuccess(true)
               router.reload(window.location.pathname)
            }
         })
         .catch(error => {
            console.log(error)
            setLoading(false)
            setError(error.response.data.message)
         })
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.left}>
            <div className={styles.topLeft}>
               <div className={styles.imageWrapperUser}>
                  <Image alt="Avatar" className={styles.user} layout="fill"
                         quality={100} src={avatar}/>
               </div>
               {fullName? <Text big bold>{fullName}</Text> : null}
            </div>
            <div className={styles.handlers}>
               <ul>
                  <li className={view === 1 ? styles.active : ""} onClick={() => viewSetter(1)}>
                     <div className={styles.buttonRow}>
                        <IconAccount/>
                        <Text semiBold>Account</Text>
                     </div>
                  </li>
                  <li className={view === 2 ? styles.active : ""} onClick={() => viewSetter(2)}>
                     <div className={styles.buttonRow}>
                        <IconChangePass/>
                        <Text semiBold>Change Password</Text>
                     </div>
                  </li>
                  {!institution && <li className={view === 3 ? styles.active : ""} onClick={() => viewSetter(3)}>
                     <div className={styles.buttonRow}>
                        <IconSecurity/>
                        <Text semiBold>Security & Privacy</Text>
                     </div>
                  </li>}
                  {!institution && <li className={view === 4 ? styles.active : ""} onClick={() => viewSetter(4)}>
                     <div className={styles.buttonRow}>
                        <IconCurrency/>
                        <Text semiBold>Currency</Text>
                     </div>
                  </li>}
               </ul>
            </div>
         </div>
         <div className={styles.right}>
            {
               view === 1
                  ? <>
                     <Text big bold>Account</Text>
                     <form className={styles.form}>
                        <Text grey small>Full Name</Text>
                        <Input disabled inputName="firstName" placeholder={fullName}
                               type="text"/>
                        <Text grey small>Email Address</Text>
                        <Input disabled inputName="email" placeholder={email}
                               type="text"/>
                        {institution && <>
                           <Text grey small>Organization</Text>
                           <Input disabled inputName="organization" placeholder={userData.institution.name}
                                  type="text"/>
                        </>}
                        <Button blue disabled thin>
                           <div className={styles.buttonRow}>
                              <IconCheckMark/>
                              <Text>Save Changes</Text>
                           </div>
                        </Button>
                     </form>
                  </>
                  : view === 2
                     ? <>
                        <Text big bold>Change Password</Text>
                        <form className={styles.form} onSubmit={handleFormSubmitChangePass}>
                           <Text grey small>Old Password</Text>
                           <Input hideEye inputName="oldPassword" type="password"
                                  value={formChangePass.oldPassword} onChange={handleFormChange}/>
                           <Text grey small>New Password</Text>
                           <Input hideEye type="password" value={formChangePass.password}
                                  onChange={handleFormChange}/>
                           <Text grey small>Repeat new password</Text>
                           <Input hideEye passwordRepeat type="password"
                                  value={formChangePass.passwordRepeat} onChange={handleFormChange}/>
                           {
                              error
                                 ? <Button error thin>
                                    <div className={styles.buttonRow}>
                                       <IconCheckMark/>
                                       <Text>{error}</Text>
                                    </div>
                                 </Button>
                                 : <Button blue thin
                                           disabled={formChangePass.password === "" && formChangePass.oldPassword === "" && formChangePass.passwordRepeat === ""}>
                                    <div className={styles.buttonRow}>
                                       <IconCheckMark/>
                                       <Text>
                                          {loading
                                             ? <IconLoading/>
                                             : success
                                                ? "Success!"
                                                : "Save Changes"
                                          }
                                       </Text>
                                    </div>
                                 </Button>
                           }
                        </form>
                     </>
                     : view === 3
                        ? <>
                           <Text big bold>Security & Privacy</Text>
                           <form className={styles.security}>
                              <Input checkboxText="Receive news and other updates through email" inputName="newsAndUpdates"
                                     type="checkbox"/>
                              <Input checkboxText="Receive deals and sales information through email"
                                     inputName="dealsAndSales" type="checkbox"/>
                              <div className={styles.bottomWrapper}>
                                 <Button blue disabled thin>
                                    <div className={styles.buttonRow}>
                                       <IconCheckMark/>
                                       <Text>Save Changes</Text>
                                    </div>
                                 </Button>
                                 <Text grey>Delete Account</Text>
                              </div>
                           </form>
                        </>
                        : view === 4
                           ? <>
                              <Text big bold>Currency</Text>
                              <Text grey>Please set the default currency you wish to make payments in</Text>
                              <div className={styles.currency}>
                                 <div className={styles.currencyWrapper}>
                                    <button className={styles.currencyButton} onClick={handleShowCurrencyDropdown}>
                                       <Text blackSpan><span>{!currencyDropdownValue ? userData.currency : currencyDropdownValue}</span>&nbsp;&nbsp;{!currencyDropdownValue ? checkCurrency(userData.currency) : checkCurrency(currencyDropdownValue)}
                                       </Text>
                                       <IconShowDropdown/>
                                    </button>
                                    <div className={styles.currencyDropdown}
                                         style={{ display: currencyDropdownShow ? "block" : "" }}>
                                       <ul>
                                          {!currencyDropdownValue ? currencies.filter(item => userData.currency !== item.currency).map(item => (
                                             <li key={item.currency} value={item.currency} onClick={handleCurrencyOption}>
                                                {item.currency}
                                             </li>
                                          )) : currencies.filter(item => currencyDropdownValue !== item.currency).map(item => (
                                             <li key={item.currency} value={item.currency} onClick={handleCurrencyOption}>
                                                {item.currency}
                                             </li>))}
                                       </ul>
                                    </div>
                                 </div>
                                 {
                                    error
                                       ? <Button error thin>
                                          <div className={styles.buttonRow}>
                                             <IconCheckMark/>
                                             <Text>{error}</Text>
                                          </div>
                                       </Button>
                                       : <Button blue thin disabled={userData.currency === currencyDropdownValue}
                                                 onClick={handleCurrencyChangeRequest}>
                                          <div className={styles.buttonRow}>
                                             <IconCheckMark/>
                                             <Text>
                                                {loading
                                                   ? <IconLoading/>
                                                   : success
                                                      ? "Success!"
                                                      : "Save Changes"
                                                }
                                             </Text>
                                          </div>
                                       </Button>
                                 }

                              </div>
                           </>
                           : null
            }
         </div>
      </div>
   )
}

export default SettingsView

SettingsView.propTypes = { institution: PropTypes.bool, userData: PropTypes.object }