import Image from "next/image"

import mockImage from "../../assets/images/aboutMock.jpeg"
import avatar from "../../assets/images/avatarMock.webp"
import { IconLinkedin, IconShowDropdown } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./AboutView.module.scss"

const AboutView = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.image}>
            <Image alt="mock" layout="fill" objectFit="cover"
                   quality={100} src={mockImage}/>
            <div className={styles.text}>
               <Text lightBlue medium>A shared vision</Text>
               <Text bold>BUSINESS TEAM</Text>
            </div>
         </div>
         <div className={styles.content}>
            <div className={styles.left}>
               <div className={styles.leftItem}>
                  <div className={styles.imageWrapper}>
                     <Image alt="avatar" layout="fill" src={avatar}/>
                  </div>
                  <Text bold>Hans Winkler</Text>
                  <Text grey>Co-founder</Text>
                  <a href="https://linkedin.com" rel="noreferrer" target="_blank">
                     <IconLinkedin/>
                  </a>
               </div>
               <div className={styles.leftItem}>
                  <div className={styles.imageWrapper}>
                     <Image alt="avatar" layout="fill" src={avatar}/>
                  </div>
                  <Text bold>Philip Whetstone</Text>
                  <Text grey>Co-founder</Text>
                  <a href="https://linkedin.com" rel="noreferrer" target="_blank">
                     <IconLinkedin/>
                  </a>
               </div>
            </div>
            <div className={styles.right}>
               <Text semiBold>After meeting whilst studying for their MBA, Hans and Phil are on a mission to make it
                  easier for people to prove their qualifications are genuine.</Text>
               <Text semiBold>We want to create a standard in education where individuals have full autonomy of their
                  data and their privacy guaranteed.</Text>
               <Button blue thin>
                  <div className={styles.buttonRow}>
                     <IconShowDropdown/>
                     <Text white>Read More</Text>
                  </div>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default AboutView