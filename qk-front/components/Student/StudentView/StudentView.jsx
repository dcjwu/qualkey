import { useEffect, useState } from "react"

import { getCookie } from "cookies-next"
import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"


import { showShareModalState } from "../../../atoms"
import ChangePasswordModal from "../../UI/Modal/ChangePasswordModal"
import ShareModal from "../../UI/Modal/ShareModal"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children, userData, notificationsData }) => {

   const showShareModal = useRecoilValue(showShareModalState)
   const [changePasswordModal, setChangePasswordModal] = useState(false)

   useEffect(() => {
      if (getCookie("first_login") === true) {
         setChangePasswordModal(true)
      }
   }, [])

   return (
      <>
         <div className="main__wrapper">
            <Sidebar/>
            <Topbar notificationsData={notificationsData} userData={userData}/>
            <div className="dashboard">
               {children}
            </div>
         </div>
         {showShareModal && <ShareModal/>}
         {changePasswordModal && <ChangePasswordModal/>}
      </>
   )
}

export default StudentView

StudentView.propTypes = {
   userData: PropTypes.object.isRequired,
   notificationsData: PropTypes.array
}