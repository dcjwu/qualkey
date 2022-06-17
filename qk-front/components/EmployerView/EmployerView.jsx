import Sidebar from "../UI/Sidebar/Sidebar"
import Topbar from "../UI/Topbar/Topbar"

const EmployerView = ({ children }) => {
   return (
      <>
         <div className="main__wrapper">
            <Sidebar employer/>
            <Topbar employer/>
            <div className="dashboard">
               {children}
            </div>
         </div>
      </>
   )
}

export default EmployerView