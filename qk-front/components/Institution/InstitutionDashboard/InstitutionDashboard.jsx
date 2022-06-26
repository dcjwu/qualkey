import { useRef, useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

import { processingUrl } from "../../../utils"
import InstitutionDashboardItem from "../../DashboardItem/InstitutionDashboardItem"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionDashboard.module.scss"

const InstitutionDashboard = ({ data, allCredentialsData }) => {

   const ref = useRef()
   
   const router = useRouter()
   const [credentials, setCredentials] = useState(data)
   const [hasMore, setHasMore] = useState(true)
   const [searchValue, setSearchValue] = useState("")

   console.log(credentials)

   /**
    * Get data from server
    */
   const getMoreCredentials = async () => {
      axios.get(`${processingUrl}/credential?offset=${credentials.length}&limit=${credentials.length + 10}`, { withCredentials: true })
         .then(response => {
            console.log(response, "RESPONSE")
            if (!response.data.length) {
               setHasMore(false)
            }
            setCredentials(prevState => [...prevState, ...response.data])
         })
   }

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
            <Text blackSpan
                  semiBold>Showing <span>{credentials && credentials.length}</span> from <span>{allCredentialsData ? allCredentialsData.length : credentials?.length}</span> results</Text>
            <Input type={"search"} onChange={handleInputChange} onKeyDown={handleSubmitSearch}/>
         </div>
         {credentials.length > 6
            ? <div ref={ref} className={styles.contentWrapper}>
               <InfiniteScroll dataLength={credentials.length} endMessage={<Text grey small>No more credentials</Text>} hasMore={hasMore}
                               loader={<Text grey small>No more credentials...</Text>}
                               next={getMoreCredentials} scrollableTarget={ref}>
                  {credentials ? credentials.map(data => (
                     <InstitutionDashboardItem key={data.uuid} data={data}/>
                  )) : null}
               </InfiniteScroll>
            </div>
            : <div className={styles.contentWrapper}>
               {credentials ? credentials.map(data => (
                  <InstitutionDashboardItem key={data.uuid} data={data}/>
               )) : null}
            </div>}
      </>
   )
}

export default InstitutionDashboard

InstitutionDashboard.propTypes = { allCredentialsData: PropTypes.array }