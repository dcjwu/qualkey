import { useEffect, useRef } from "react"

import Image from "next/image"
import { useMediaQuery } from "react-responsive"
import { useRecoilState } from "recoil"

import logo from "../../../../assets/images/qk-logo-text.svg"
import { burgerMenuActiveState, uploadModalState } from "../../../../atoms"
import { IconAcademicCapPerson, IconKey, IconLogout, IconMessage, IconPlus, IconPolicy, IconQuestion } from "../../_Icon"
import BurgerButton from "../../BurgerButton/BurgerButton"
import Text from "../../Text/Text"
import styles from "./InstitutionSidebar.module.scss"

const InstitutionSidebar = () => {

   //TODO: Fix error with prop 'style' server and client difference.

   const isScreenLg = useMediaQuery({ query: "(max-width: 991px)" })
   const isScreenMd = useMediaQuery({ query: "(max-width: 767px" })

   const [openModal, setOpenModal] = useRecoilState(uploadModalState)
   const [burgerMenuActive, setBurgerMenuActive] = useRecoilState(burgerMenuActiveState)

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
   }, [burgerMenuActive])

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
                     { marginLeft: isScreenMd ? "-13rem" : isScreenLg ? "-11rem" : "", marginBottom: "1.7rem" }}/>
                  <hr className={styles.hr}/>
                  <div className={styles.menu}>
                     <Text bold sidebar active={!openModal}>
                        <IconAcademicCapPerson/>
                        <span>University Dashboard</span>
                     </Text>
                     <Text bold sidebar active={openModal}
                           onClick={() => setOpenModal(true)}>
                        <IconPlus/>
                        <span>Upload</span>
                     </Text>
                  </div>
               </div>
               <div className={styles.bottom}>
                  <hr className={styles.hr}/>
                  <div className={styles.helpers}>
                     <Text sidebar sidebarMin>
                        <IconQuestion/>
                        <span>Help & FAQ</span>
                     </Text>
                     <Text sidebar sidebarMin>
                        <IconMessage/>
                        <span>Contact Us</span>
                     </Text>
                     <Text sidebar sidebarMin>
                        <IconKey/>
                        <span>About Us</span>
                     </Text>
                     <Text sidebar sidebarMin>
                        <IconPolicy/>
                        <span>Privacy Policy</span>
                     </Text>
                     <Text sidebar sidebarMin>
                        <IconLogout/>
                        <span>Log Out</span>
                     </Text>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstitutionSidebar