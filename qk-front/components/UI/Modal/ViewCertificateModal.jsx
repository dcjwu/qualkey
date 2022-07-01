import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { viewCertificateModalState } from "../../../atoms"
import Certificate from "../../Certificate/Certificate"
import { IconClose, IconInstagramColor, IconLinkedinColor, IconShare } from "../_Icon"
import Button from "../Button/Button"
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
                  <Certificate data={data}/>
                  <Text grey medium>Your QualKey certificate may look different to the paper or digital certificate
                     issued by your
                     Academic institution. QualKey adds a unique QR code so that third parties can securely and
                     instantly
                     authenticate your qualification.</Text>
                  <Text bold>Share via</Text>
                  <div className={styles.shareButtons}>
                     <Button blue thin>
                        <div className={styles.rowButton}>
                           <IconShare/>
                           <Text white>Email</Text>
                        </div>
                     </Button>
                     <Button thin white>
                        <div className={styles.rowButton}>
                           <IconInstagramColor/>
                           <Text blue>Instagram</Text>
                        </div>
                     </Button>
                     <Button thin white>
                        <div className={styles.rowButton}>
                           <IconLinkedinColor/>
                           <Text blue>LinkedIn</Text>
                        </div>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ViewCertificateModal

ViewCertificateModal.propTypes = { data: PropTypes.object.isRequired }