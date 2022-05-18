import Image from "next/image"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import { IconAcademicCap, IconCertificate, IconInfo } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const StudentViewCredentialsItem = ({ data }) => {

   const { diploma, status } = data

   const validateStatus = () => {
      if (status === "Activated") return styles.activated
      if (status === "Uploaded") return styles.uploaded
      if (status === "Withdrawn") return styles.withdrawn
      if (status === "Expired") return styles.expired
   }
   
   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.student}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={schoolLogo} width={196}/>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{diploma}</Text>
               </div>
            </div>
            <div className={`${styles.status} ${validateStatus()}`}>
               <IconInfo/>
               <Text bold>{status}</Text>
            </div>
            <div className={styles.actions}>
               <Button blue this>
                  <div className={styles.buttonRow}>
                     <IconCertificate/>
                     <Text semiBold>Certificate</Text>
                  </div>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default StudentViewCredentialsItem