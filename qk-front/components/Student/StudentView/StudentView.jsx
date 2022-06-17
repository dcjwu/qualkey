import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"

import { showShareModalState } from "../../../atoms"
import ShareModal from "../../UI/Modal/ShareModal"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children, userData, notificationsData }) => {

   const showShareModal = useRecoilValue(showShareModalState)

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
      </>
   )
}

export default StudentView

StudentView.propTypes = {
   userData: PropTypes.object.isRequired,
   notificationsData: PropTypes.array
}