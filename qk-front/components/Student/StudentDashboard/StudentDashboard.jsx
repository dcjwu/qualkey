import StudentDashboardItem from "../../DashboardItem/StudentDashboardItem"
import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./StudentDashboard.module.scss"

const mockData = [
   {
      id: 1,
      diploma: "BA Computer Science and Engineering",
      status: "Activated",
   },
   {
      id: 2,
      diploma: "BA Computer Science and Engineering",
      status: "Expired",
   },
   {
      id: 3,
      diploma: "MSc Data Science in Business",
      status: "Withdrawn",
   },
   {
      id: 4,
      diploma: "MA International Relations",
      status: "Activated",
   },
   {
      id: 5,
      diploma: "BA Computer Science and Engineering",
      status: "Activate Credentials",
   },
   {
      id: 6,
      diploma: "BA Computer Science and Engineering",
      status: "Activate Credentials",
   },
]

const StudentDashboard = () => {
   return (
      <>
         <div className={styles.searchShareWrapper}>
            <Input type={"search"}/>
            <Button blue disabled thin>
               <div className={styles.buttonRow}>
                  <IconShare/>
                  <Text bold>Share Selected</Text>
               </div>
            </Button>
         </div>
         <div className={styles.contentWrapper}>
            {mockData.map(data => (
               <StudentDashboardItem key={data.id} data={data}/>
            ))}
         </div>
      </>
   )
}

export default StudentDashboard