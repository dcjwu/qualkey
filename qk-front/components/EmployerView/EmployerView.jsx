import Sidebar from "../UI/Sidebar/Sidebar"
import Topbar from "../UI/Topbar/Topbar"

const EmployerView = ({ children, publicPage, did, share }) => {
   return (
      <>
         <div className="main__wrapper">
            <Sidebar employer did={did} publicPage={publicPage}/>
            <Topbar employer share={share}/>
            <div className="dashboard">
               {children}
            </div>
         </div>
      </>
   )
}

export default EmployerView