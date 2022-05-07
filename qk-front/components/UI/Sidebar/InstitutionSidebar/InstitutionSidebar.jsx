import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../../../../assets/images/qk-logo-xl.png"
import { uploadModalState } from "../../../../atoms/uploadModal.atoms/uploadModalState"
import Text from "../../Text/Text"
import styles from "./InstitutionSidebar.module.scss"

const InstitutionSidebar = () => {

   const [openModal, setOpenModal] = useRecoilState(uploadModalState)

   return (
      <div className={styles.sidebar}>
         <div className={styles.wrapper}>
            <div className={styles.top}>
               <div className={styles.imageWrapper}>
                  <Image alt="Qualkey" layout="fill" src={logo}/>
               </div>
               <hr className={styles.hr}/>
               <div className={styles.menu}>
                  <Text bold sidebar active={!openModal}>
                     <svg fill="none" height="32" viewBox="0 0 32 32"
                          width="32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8V18" stroke="white" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M6.77539 26.9999C7.77597 25.4653 9.14361 24.2045 10.7544 23.3317C12.3653 22.459 14.1683 22.002 16.0004 22.002C17.8324 22.002 19.6355 22.459 21.2464 23.3317C22.8572 24.2045 24.2248 25.4653 25.2254 26.9999"
                           stroke="white" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M28 8L16 12L4 8L16 4L28 8Z" stroke="white" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M21.1625 10.2754C22.0798 11.2771 22.6859 12.5241 22.9068 13.8643C23.1277 15.2044 22.954 16.58 22.4067 17.8231C21.8595 19.0663 20.9624 20.1233 19.8248 20.8655C18.6872 21.6077 17.3583 22.0028 16 22.0028C14.6417 22.0028 13.3128 21.6077 12.1752 20.8655C11.0376 20.1233 10.1405 19.0663 9.59329 17.8231C9.04604 16.58 8.87229 15.2044 9.09322 13.8643C9.31414 12.5241 9.9202 11.2771 10.8375 10.2754"
                           stroke="white" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                     </svg>
                     <span>Overview</span>
                  </Text>
                  <Text bold sidebar active={openModal}
                        onClick={() => setOpenModal(true)}>
                     <svg fill="none" height="32" viewBox="0 0 32 32"
                          width="32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M11 16H21" stroke="#E5E5E5" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M16 11V21" stroke="#E5E5E5" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                     </svg>
                     <span>Upload</span>
                  </Text>
               </div>
            </div>
            <div className={styles.bottom}>
               <hr className={styles.hr}/>
               <div className={styles.helpers}>
                  <Text sidebar sidebarMin>
                     <svg fill="none" height="24" viewBox="0 0 25 24"
                          width="25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M12.5 17.8125C13.0178 17.8125 13.4375 17.3928 13.4375 16.875C13.4375 16.3572 13.0178 15.9375 12.5 15.9375C11.9822 15.9375 11.5625 16.3572 11.5625 16.875C11.5625 17.3928 11.9822 17.8125 12.5 17.8125Z"
                           fill="#E5E5E5"/>
                        <path d="M12.5 13.5V12.75C13.0192 12.75 13.5267 12.596 13.9584 12.3076C14.3901 12.0192 14.7265 11.6092 14.9252 11.1295C15.1239 10.6499 15.1758 10.1221 15.0746 9.61289C14.9733 9.10369 14.7233 8.63596 14.3562 8.26885C13.989 7.90173 13.5213 7.65173 13.0121 7.55044C12.5029 7.44915 11.9751 7.50114 11.4955 7.69982C11.0158 7.8985 10.6058 8.23495 10.3174 8.66663C10.029 9.09831 9.875 9.60583 9.875 10.125"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                     </svg>
                     <span>Help & FAQ</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <svg fill="none" height="24" viewBox="0 0 25 24"
                          width="25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8751 20.25H4.97194C4.87679 20.2513 4.78236 20.2334 4.6942 20.1976C4.60605 20.1618 4.52597 20.1087 4.45869 20.0414C4.3914 19.9741 4.33828 19.894 4.30244 19.8059C4.26661 19.7177 4.2488 19.6233 4.25006 19.5281V11.625C4.25006 9.33751 5.15877 7.14371 6.77627 5.5262C8.39377 3.9087 10.5876 3 12.8751 3V3C14.0077 3 15.1293 3.22309 16.1757 3.65654C17.2221 4.08999 18.173 4.7253 18.9739 5.5262C19.7748 6.32711 20.4101 7.27792 20.8435 8.32436C21.277 9.37079 21.5001 10.4923 21.5001 11.625V11.625C21.5001 12.7577 21.277 13.8792 20.8435 14.9256C20.4101 15.9721 19.7748 16.9229 18.9739 17.7238C18.173 18.5247 17.2221 19.16 16.1757 19.5935C15.1293 20.0269 14.0077 20.25 12.8751 20.25V20.25Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M12.875 12.9375C13.3928 12.9375 13.8125 12.5178 13.8125 12C13.8125 11.4822 13.3928 11.0625 12.875 11.0625C12.3572 11.0625 11.9375 11.4822 11.9375 12C11.9375 12.5178 12.3572 12.9375 12.875 12.9375Z"
                           fill="#E5E5E5"/>
                        <path d="M17.375 12.9375C17.8928 12.9375 18.3125 12.5178 18.3125 12C18.3125 11.4822 17.8928 11.0625 17.375 11.0625C16.8572 11.0625 16.4375 11.4822 16.4375 12C16.4375 12.5178 16.8572 12.9375 17.375 12.9375Z"
                           fill="#E5E5E5"/>
                        <path d="M8.375 12.9375C8.89277 12.9375 9.3125 12.5178 9.3125 12C9.3125 11.4822 8.89277 11.0625 8.375 11.0625C7.85723 11.0625 7.4375 11.4822 7.4375 12C7.4375 12.5178 7.85723 12.9375 8.375 12.9375Z"
                           fill="#E5E5E5"/>
                     </svg>
                     <span>Contact Us</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <svg fill="none" height="24" viewBox="0 0 25 24"
                          width="25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.2375 11.5125C8.91238 10.7149 8.74676 9.86131 8.75 9C8.75 7.66498 9.14588 6.35994 9.88758 5.2499C10.6293 4.13987 11.6835 3.27471 12.9169 2.76382C14.1503 2.25292 15.5075 2.11925 16.8169 2.3797C18.1262 2.64015 19.329 3.28303 20.273 4.22703C21.217 5.17104 21.8599 6.37377 22.1203 7.68314C22.3808 8.99252 22.2471 10.3497 21.7362 11.5831C21.2253 12.8165 20.3601 13.8707 19.2501 14.6124C18.1401 15.3541 16.835 15.75 15.5 15.75C14.6387 15.7532 13.7851 15.5876 12.9875 15.2625V15.2625L11.75 16.5H9.5V18.75H7.25V21H3.5V17.25L9.2375 11.5125Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M17.375 8.0625C17.8928 8.0625 18.3125 7.64277 18.3125 7.125C18.3125 6.60723 17.8928 6.1875 17.375 6.1875C16.8572 6.1875 16.4375 6.60723 16.4375 7.125C16.4375 7.64277 16.8572 8.0625 17.375 8.0625Z"
                           fill="#E5E5E5"/>
                     </svg>
                     <span>About Us</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <svg fill="none" height="24" viewBox="0 0 25 24"
                          width="25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 10.7531V5.25C4.25 5.05109 4.32902 4.86032 4.46967 4.71967C4.61032 4.57902 4.80109 4.5 5 4.5H20C20.1989 4.5 20.3897 4.57902 20.5303 4.71967C20.671 4.86032 20.75 5.05109 20.75 5.25V10.7531C20.75 18.6281 14.0656 21.2344 12.7344 21.675C12.5831 21.731 12.4169 21.731 12.2656 21.675C10.9344 21.2344 4.25 18.6281 4.25 10.7531Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M12.5 9V12.75" stroke="#E5E5E5" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M12.5 17.0625C13.0178 17.0625 13.4375 16.6428 13.4375 16.125C13.4375 15.6072 13.0178 15.1875 12.5 15.1875C11.9822 15.1875 11.5625 15.6072 11.5625 16.125C11.5625 16.6428 11.9822 17.0625 12.5 17.0625Z"
                           fill="#E5E5E5"/>
                     </svg>
                     <span>Privacy Policy</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <svg fill="none" height="24" viewBox="0 0 25 24"
                          width="25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                           stroke="#E5E5E5" strokeLinecap="round"
                           strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M11.9281 15.178L8.75 11.9999L11.9281 8.82178" stroke="#E5E5E5" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M8.75 12H16.25" stroke="#E5E5E5" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                     </svg>
                     <span>Log Out</span>
                  </Text>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstitutionSidebar