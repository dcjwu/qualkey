import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMediaQuery } from "react-responsive"

import avatar from "../../../assets/images/avatarMock.webp"
import bell from "../../../assets/images/bell.svg"
import uniLogo from "../../../assets/images/mockUniLogo.webp"
import { IconAcademicCap, IconArrowLeft, IconHideDropdownBig, IconLogout, IconMessage, IconSettings } from "../_Icon"
import BurgerButton from "../BurgerButton/BurgerButton"
import Text from "../Text/Text"
import styles from "./Topbar.module.scss"

const Topbar = () => {
   
   const { pathname } = useRouter()

   const checkIfPathIncludesView = () => {
      if (pathname.includes("/credentials-view")) return true
   }
   
   const isScreenLg = useMediaQuery({ query: "(max-width: 991px)" })
   const isScreenMd = useMediaQuery({ query: "(max-width: 767px" })

   const [lgMarginLeft, setLgMarginLeft] = useState("")
   const [mdMarginLeft, setMdMarginLeft] = useState("")

   useEffect(() => {
      setMdMarginLeft("2.5rem")
      setLgMarginLeft("")
   }, [isScreenMd])

   useEffect(() => {
      setLgMarginLeft("3.5rem")
      setMdMarginLeft("")
   }, [isScreenLg])

   const [showMenu, setShowMenu] = useState(false)

   const handleShowMenu = () => {
      setShowMenu(prevState => !prevState)
   }

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
                  <Text grey>University Dashboard</Text>
               </a>
            </Link>
            <IconArrowLeft/>
            <Text>View Credentials</Text>
         </div>}
         <BurgerButton style={{ marginLeft: lgMarginLeft || mdMarginLeft }}/>
         <div className={styles.right}>
            <div className={styles.imageWrapperNotification}>
               <Image alt="bell" layout="fill" quality={100}
                      src={bell}/>
               <span className={styles.notification}>3</span>
            </div>
            <div className={styles.imageWrapperLogo}>
               <Image alt="uni" className={styles.logo} layout="fill"
                      objectFit={"contain"}
                      quality={100} src={uniLogo}/>
            </div>
            <div className={styles.userWrapper} onClick={handleShowMenu}>
               <div className={styles.imageWrapperUser}>
                  <Image alt="user" className={styles.user} layout="fill"
                         quality={100} src={avatar}/>
               </div>
               <Text semiBold>John Reed</Text>
               <IconHideDropdownBig/>
               <div ref={outsideClickRef} className={styles.menu} style={{ display: showMenu ? "block" : "none" }}>
                  <ul>
                     <li>
                        <IconAcademicCap/>
                        <Text>Dashboard</Text>
                     </li>
                     <li>
                        <IconSettings/>
                        <Text>Settings</Text>
                     </li>
                     <li>
                        <IconMessage/>
                        <Text>Give feedback</Text>
                     </li>
                     <li>
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