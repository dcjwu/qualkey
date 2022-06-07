import PropTypes from "prop-types"

import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children, userData, notificationsData }) => {
   
   return (
      <div className="main__wrapper">
         <Sidebar/>
         <Topbar notificationsData={notificationsData} userData={userData}/>
         <div className="dashboard">
            {children}
         </div>
      </div>
   )
}

export default StudentView

StudentView.propTypes = {
   userData: PropTypes.object.isRequired,
   notificationsData: PropTypes.array
}