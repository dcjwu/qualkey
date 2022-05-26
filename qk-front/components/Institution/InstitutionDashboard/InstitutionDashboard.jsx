import { useState } from "react"

import { useRouter } from "next/router"

import InstitutionDashboardItem from "../../DashboardItem/InstitutionDashboardItem"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionDashboard.module.scss"

const InstitutionDashboard = ({ data, allCredentialsData }) => {

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
         <div className={styles.searchWrapper}>
            <Text blackSpan semiBold>Showing <span>{data.length}</span> from <span>{allCredentialsData?.data.length ? allCredentialsData.data.length : data.length}</span> results</Text>
            <Input type={"search"} onChange={handleInputChange} onKeyDown={handleSubmitSearch}/>
         </div>
         <div className={styles.contentWrapper}>
            {data.map(data => (
               <InstitutionDashboardItem key={data.uuid} data={data}/>
            ))}
         </div>
      </>
   )
}

export default InstitutionDashboard