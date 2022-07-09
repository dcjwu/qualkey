import { useEffect, useRef, useState } from "react"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useMediaQuery } from "react-responsive"
import { useRecoilState } from "recoil"

import logo from "../../../assets/images/qk-logo-text.svg"
import { burgerMenuActiveState, queryShareState, uploadModalState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconAcademicCapPerson, IconKey, IconLogout, IconMessage, IconPlus, IconPolicy, IconQuestion } from "../_Icon"
import BurgerButton from "../BurgerButton/BurgerButton"
import Text from "../Text/Text"
import styles from "./Sidebar.module.scss"

const Sidebar = ({ institution, employer, publicPage, did }) => {

   const { push, pathname, query } = useRouter()

   const [shareState, setShareState] = useRecoilState(queryShareState)

   useEffect(() => {
      if (pathname === "/share/[uuid]") {
         setShareState(query.uuid)
         setShareState({
            ...shareState,
            uuid: query.uuid,
            password: query.password
         })
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   const isScreenLg = useMediaQuery({ query: "(max-width: 991px)" })
   const isScreenMd = useMediaQuery({ query: "(max-width: 767px" })

   const [lgMarginLeft, setLgMarginLeft] = useState("")
   const [mdMarginLeft, setMdMarginLeft] = useState("")

   /**
    * Logout handler.
    */
   const handleLogout = () => {
      axios.post(`${processingUrl}/auth/logout`, {}, { withCredentials: true })
         .then(response => {
            push(response.data)
         })
         .catch(error => console.log(error))
   }

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setMdMarginLeft("-13rem")
      setLgMarginLeft("")
   }, [isScreenMd])

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setLgMarginLeft("-11rem")
      setMdMarginLeft("")
   }, [isScreenLg])

   const [openModal, setOpenModal] = useRecoilState(uploadModalState)
   const [burgerMenuActive, setBurgerMenuActive] = useRecoilState(burgerMenuActiveState)

   /**
    * Allows to close sidebar on click outside.
    */
   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (burgerMenuActive && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setBurgerMenuActive(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [burgerMenuActive]) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      return () => {
         setBurgerMenuActive(false)
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div className={burgerMenuActive ? styles.darken : ""}>
         <div ref={outsideClickRef} className={`${styles.sidebar} ${burgerMenuActive ? styles.active : ""}`}>
            <div className={styles.wrapper}>
               <div className={styles.top}>
                  <div className={styles.imageWrapper}>
                     <Image alt="Qualkey" layout="fill" quality={100}
                            src={logo}/>
                  </div>
                  <BurgerButton style={
                     { marginLeft: lgMarginLeft || mdMarginLeft, marginBottom: "1.7rem" }}/>
                  <hr className={styles.hr}/>
                  <div className={styles.menu}>
                     {!employer
                        ? <Link href="/dashboard">
                           <a>
                              <Text bold sidebar
                                    active={pathname === "/dashboard" ? !openModal : pathname === "dashboard"}>
                                 <IconAcademicCapPerson/>
                                 {institution ? <span>University Dashboard</span> : <span>Credentials Dashboard</span>}
                              </Text>
                           </a>
                        </Link> :
                        <Link href={!publicPage ? `/share/${shareState.uuid}?password=${shareState.password}` : `/${did}`}>
                           <a>
                              <Text bold sidebar active={pathname === "/share/[uuid]" || publicPage}>
                                 <IconAcademicCapPerson/>
                                 <span>Shared Credentials</span>
                              </Text>
                           </a>
                        </Link>}
                     {institution && <Text bold sidebar active={openModal}
                                           onClick={() => setOpenModal(true)}>
                        <IconPlus/>
                        <span>Upload</span>
                     </Text>}
                  </div>
               </div>
               <div className={styles.bottom}>
                  <hr className={styles.hr}/>
                  <div className={styles.helpers}>
                     <Link href={!employer ? "/help" : "/share/help"}>
                        <a target={publicPage ? "_black" : "_self"}>
                           <Text sidebar sidebarMin active={pathname.includes("/help")}>
                              <IconQuestion/>
                              <span>Help & FAQ</span>
                           </Text>
                        </a>
                     </Link>
                     <Link href={!employer ? "/contact" : "/share/contact"}>
                        <a target={publicPage ? "_black" : "_self"}>
                           <Text sidebar sidebarMin
                                 active={pathname.includes("/contact") || pathname.includes("/feedback")}>
                              <IconMessage/>
                              <span>Contact Us</span>
                           </Text>
                        </a>
                     </Link>
                     <Link href={!employer ? "/about" : "/share/about"}>
                        <a target={publicPage ? "_black" : "_self"}>
                           <Text sidebar sidebarMin active={pathname.includes("/about")}>
                              <IconKey/>
                              <span>About Us</span>
                           </Text>
                        </a>
                     </Link>
                     <Link href={!employer ? "/policy" : "/share/policy"}>
                        <a target={publicPage ? "_black" : "_self"}>
                           <Text sidebar sidebarMin active={pathname.includes("/policy")}>
                              <IconPolicy/>
                              <span>Privacy Policy</span>
                           </Text>
                        </a>
                     </Link>
                     {!employer ? <Text sidebar sidebarMin onClick={handleLogout}>
                        <IconLogout/>
                        <span>Log Out</span>
                     </Text> : <Link href="/"><a><Text sidebar sidebarMin>
                        <IconLogout/>
                        <span>Log In</span>
                     </Text></a></Link>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Sidebar

Sidebar.propTypes = { institution: PropTypes.bool }