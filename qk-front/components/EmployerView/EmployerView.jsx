import Sidebar from "../UI/Sidebar/Sidebar"
import Topbar from "../UI/Topbar/Topbar"

const EmployerView = ({ children, publicPage, did }) => {
   return (
      <>
         <div className="main__wrapper">
            <Sidebar employer did={did} publicPage={publicPage}/>
            <Topbar employer/>
            <div className="dashboard">
               {children}
            </div>
         </div>
      </>
   )
}

export default EmployerView