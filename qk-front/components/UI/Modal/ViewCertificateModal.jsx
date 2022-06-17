import moment from "moment"
import Image from "next/image"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import qkLogo from "../../../assets/images/qk-logo-text-blue.svg"
import { viewCertificateModalState } from "../../../atoms"
import { IconClose, IconEllipseBl, IconEllipseBr, IconEllipseTl, IconEllipseTr, IconShare } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import styles from "./Modal.module.scss"

const ViewCertificateModal = ({ data }) => {

   const [, setViewCertificateModal] = useRecoilState(viewCertificateModalState)

   /**
    * Close modal
    */
   const closeModal = () => {
      setViewCertificateModal(false)
   }

   /**
    * Close modal by clicking outside
    */
   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={`${styles.wrapper} ${styles.viewCertificate}`} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <div className={`${styles.top}`}>
               <div className={`${styles.wrapperInner} ${styles.viewCertificate}`}>
                  <Heading blue h2 modal>Your certificate</Heading>
                  <div className={styles.certificateWrapper}>
                     <IconEllipseTl/>
                     <IconEllipseTr/>
                     <IconEllipseBl/>
                     <IconEllipseBr/>
                     <div className={styles.imageWrapper}>
                        <Image alt="uni logo" height={102} objectFit="contain"
                               src={!data?.institution?.logoUrl ? data.institutionLogoUrl : data?.institution?.logoUrl}
                               width={308}/>
                     </div>
                     <div className={styles.certificateInner}>
                        <div className={styles.left}>
                           <div>
                              <Text grey medium>THIS IS TO CERTIFY THAT</Text>
                              <Text bold large>{data.graduatedName}</Text>
                           </div>
                           <div>
                              <Text grey medium>WAS AWARDED THE QUALIFICATION OF</Text>
                              <Text bold large>{data.qualificationName}</Text>
                           </div>
                           <div>
                              <Text grey medium>GRADUATION DATE</Text>
                              <Text bold large>{moment.utc(data.graduatedAt).format("DD/MM/YYYY")}</Text>
                           </div>
                        </div>
                        <div className={styles.right}>
                           <div>
                              <Text grey small>Authenticated by:</Text>
                              <Text semiBold small>{data.authenticatedBy ? data.authenticatedBy : "-"}</Text>
                           </div>
                           <div>
                              <Text grey small>Authenticated Title:</Text>
                              <Text semiBold small>{data.authenticatedTitle ? data.authenticatedTitle : "-"}</Text>
                           </div>
                           <div>
                              <Text grey small>Authenticated on:</Text>
                              <Text semiBold
                                    small>{data.authenticatedAt ? moment.utc(data.authenticatedAt).format("DD/MM/YYYY HH:mm") + " (GMT)" : "-"}</Text>
                           </div>
                        </div>
                     </div>
                     <div className={styles.bottom}>
                        <Image alt="qk logo" height={113} src={qkLogo}
                               width={165}/>
                        <Text blueSpan medium>This certificate has been generated by <span>QualKey</span> using the
                           authenticated credentials of the issuing Academic institution. This is not the original
                           certificate issued by the Academic institution. </Text>
                     </div>
                  </div>
                  <Text grey medium>Your QualKey certificate may look different to the paper or digital certificate
                     issued by your
                     Academic institution. QualKey adds a unique QR code so that third parties can securely and
                     instantly
                     authenticate your qualification.</Text>
                  <Button blue thin>
                     <div className={styles.rowButton}>
                        <IconShare/>
                        <Text semiBold>Share Certificate</Text>
                     </div>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ViewCertificateModal

ViewCertificateModal.propTypes = { data: PropTypes.object.isRequired }