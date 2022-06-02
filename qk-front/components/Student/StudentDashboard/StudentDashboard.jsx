import { useState } from "react"

import { useRouter } from "next/router"
import PropTypes from "prop-types"

import StudentDashboardItem from "../../DashboardItem/StudentDashboardItem"
import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./StudentDashboard.module.scss"

const StudentDashboard = ({ data }) => {

   const router = useRouter()
   const [searchValue, setSearchValue] = useState("")

   /**
    * Input value handling.
    **/
   const handleInputChange = ({ target }) => {
      setSearchValue(target.value)
   }

   /**
    * Search input handling.
    **/
   const handleSubmitSearch = e => {
      if (searchValue.trim() !== "") {
         if (e.key === "Enter") {
            router.push({
               pathname: "/dashboard",
               query: { filter: searchValue }
            })
         }
      }
   }

   return (
      <>
         <div className={styles.searchShareWrapper}>
            <Input type={"search"} value={searchValue} onChange={handleInputChange}
                   onKeyDown={handleSubmitSearch}/>
            <Button blue disabled thin>
               <div className={styles.buttonRow}>
                  <IconShare/>
                  <Text bold>Share Selected</Text>
               </div>
            </Button>
         </div>
         <div className={styles.contentWrapper}>
            {data.map(data => (
               <StudentDashboardItem key={data.uuid} data={data}/>
            ))}
         </div>
      </>
   )
}

export default StudentDashboard

StudentDashboard.propTypes = { data: PropTypes.array }