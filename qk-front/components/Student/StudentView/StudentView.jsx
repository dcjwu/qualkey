import { useEffect, useState } from "react"

import { getCookie } from "cookies-next"
import PropTypes from "prop-types"
import { useRecoilState, useRecoilValue } from "recoil"


import { showShareModalState , studentNameState } from "../../../atoms"
import ChangePasswordModal from "../../UI/Modal/ChangePasswordModal"
import ShareModal from "../../UI/Modal/ShareModal"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children, userData, notificationsData, credentials, publicPage }) => {

   const showShareModal = useRecoilValue(showShareModalState)
   const [changePasswordModal, setChangePasswordModal] = useState(false)
   const [, setStudentGlobalName] = useRecoilState(studentNameState)

   useEffect(() => {
      if (getCookie("first_login") === true) {
         setChangePasswordModal(true)
      }
   }, [])

   useEffect(() => {
      setStudentGlobalName(userData.fullName)
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <>
         <div className="main__wrapper">
            <Sidebar pagePolicy={publicPage}/>
            <Topbar notificationsData={notificationsData} publicPage={publicPage} userData={userData}/>
            <div className={`dashboard ${credentials ? "credentials" : ""}`}>
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
   notificationsData: PropTypes.array,
   credentials: PropTypes.bool
}