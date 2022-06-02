import { useEffect, useRef, useState } from "react"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMediaQuery } from "react-responsive"

import avatar from "../../../assets/images/avatarMock.webp"
import bell from "../../../assets/images/bell.svg"
import uniLogo from "../../../assets/images/mockUniLogo.webp"
import { processingUrl } from "../../../utils"
import NotificationWrapper from "../../Notification/NotificationWrapper/NotificationWrapper"
import { IconAcademicCap, IconArrowLeft, IconBackLeft, IconHideDropdownBig, IconLogout, IconMessage, IconSettings } from "../_Icon"
import BurgerButton from "../BurgerButton/BurgerButton"
import Text from "../Text/Text"
import styles from "./Topbar.module.scss"

const Topbar = ({ institution, userData, notificationsData }) => {

   const { firstName, lastName } = userData
   
   const { pathname, push } = useRouter()

   const checkIfPathIncludesView = () => {
      if (pathname.includes("[uuid]")) return true
   }
   
   const isScreenLg = useMediaQuery({ query: "(max-width: 991px)" })
   const isScreenMd = useMediaQuery({ query: "(max-width: 767px" })

   const [lgMarginLeft, setLgMarginLeft] = useState("")
   const [mdMarginLeft, setMdMarginLeft] = useState("")

   /**
    * Logout handler.
    */
   const handleLogout = () => {
      axios.post(`${processingUrl}/auth/logout`, {}, { withCredentials: true } )
         .then(response => {
            push(response.data)
         })
         .catch(error => console.log(error))
   }

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setMdMarginLeft("2.5rem")
      setLgMarginLeft("")
   }, [isScreenMd])

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setLgMarginLeft("3.5rem")
      setMdMarginLeft("")
   }, [isScreenLg])

   const [showMenu, setShowMenu] = useState(false)
   const [showNotifications, setShowNotifications] = useState(false)

   /**
    * Menu display handler.
    */
   const handleShowMenu = () => {
      setShowMenu(prevState => !prevState)
   }

   /**
    * Notification display handler.
    */
   const handleShowNotifications = () => {
      setShowNotifications(prevState => !prevState)
   }

   /**
    * Allows to close sidebar on click outside.
    */
   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (showMenu && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setShowMenu(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [showMenu])

   return (
      <div className={styles.topbar} style={{ justifyContent: checkIfPathIncludesView() ? "space-between" : "" }}>
         {checkIfPathIncludesView() && <div className={styles.routes}>
            <Link href="/dashboard">
               <a>
                  <Text grey>Dashboard</Text>
               </a>
            </Link>
            <IconArrowLeft/>
            <Text>View Credentials</Text>
         </div>}
         {checkIfPathIncludesView()
            ? <div className={styles.backRow} style={{ marginLeft: lgMarginLeft || mdMarginLeft }} onClick={() => push("/dashboard")}>
               <IconBackLeft/>
               <Text>Back</Text>
            </div>
            : <BurgerButton style={{ marginLeft: lgMarginLeft || mdMarginLeft }}/>}
         <div className={styles.right}>
            <div className={styles.imageWrapperNotification} onClick={handleShowNotifications}>
               <Image alt="bell" layout="fill" quality={100}
                      src={bell}/>
               {notificationsData.length ? <span className={styles.notification}>{notificationsData.length}</span> : null}
               <NotificationWrapper notificationsData={notificationsData} setShow={setShowNotifications} show={showNotifications}/>
            </div>
            {institution && <div className={styles.imageWrapperLogo}>
               <Image alt="uni" className={styles.logo} layout="fill"
                      objectFit={"contain"}
                      quality={100} src={uniLogo}/>
            </div>}
            <div className={styles.userWrapper} onClick={handleShowMenu}>
               <div className={styles.imageWrapperUser}>
                  <Image alt="user" className={styles.user} layout="fill"
                         quality={100} src={avatar}/>
               </div>
               <Text semiBold>{firstName[0]}. {lastName}</Text>
               <IconHideDropdownBig/>
               <div ref={outsideClickRef} className={styles.menu} style={{ display: showMenu ? "block" : "none" }}>
                  <ul>
                     <li>
                        <IconAcademicCap/>
                        <Link href="/dashboard">
                           <a>
                              <Text>Dashboard</Text>
                           </a>
                        </Link>
                     </li>
                     <li>
                        <IconSettings/>
                        <Text>Settings</Text>
                     </li>
                     <li>
                        <IconMessage/>
                        <Text>Give feedback</Text>
                     </li>
                     <li onClick={handleLogout}>
                        <IconLogout/>
                        <Text>Log out</Text>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Topbar