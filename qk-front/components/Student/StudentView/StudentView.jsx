import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children }) => {
   return (
      <div className="main__wrapper">
         <Sidebar/>
         <Topbar/>
         <div className="dashboard">
            {children}
         </div>
      </div>
   )
}

export default StudentView