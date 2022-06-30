import { useEffect, useRef, useState } from "react"

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
   const [credentials, setCredentials] = useState([])
   const [hasMore, setHasMore] = useState(true)
   const [searchValue, setSearchValue] = useState("")

   /**
    * Get data from server
    */
   const getMoreCredentials = async () => {
      axios.get(`${processingUrl}/credential?${router.query.filter ? "filter=" + router.query.filter : null}&offset=${credentials.length}&limit=${credentials.length + 10}`, { withCredentials: true })
         .then(response => {
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

   /**
    * Listener to properly manage data and hasMore flag
    */
   useEffect(() => {
      setCredentials(data)
      setSearchValue("")
      return () => {
         setHasMore(true)
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Listener to set proper data when query changes
    */
   useEffect(() => {
      setCredentials(data)
      setSearchValue("")
      if (!router.query.filter) {
         setHasMore(true)
      }
   }, [router.query.filter]) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <>
         <div className={styles.searchWrapper}>
            <Text blackSpan
                  semiBold>Showing <span>{credentials && credentials.length}</span> from <span>{allCredentialsData ? allCredentialsData.length : credentials?.length}</span> results</Text>
            <Input type={"search"} value={searchValue} onChange={handleInputChange}
                   onKeyDown={handleSubmitSearch}/>
         </div>
         <div ref={ref} className={styles.contentWrapper}>
            <InfiniteScroll dataLength={credentials.length} endMessage={<Text grey small>No more credentials</Text>}
                               hasMore={hasMore}
                               loader={<Text grey small>No more credentials...</Text>}
                               next={getMoreCredentials} scrollableTarget={ref}>
               {credentials ? credentials.map(data => (
                  <InstitutionDashboardItem key={data.uuid} data={data}/>
               )) : null}
            </InfiniteScroll>
         </div>
      </>
   )
}

export default InstitutionDashboard

InstitutionDashboard.propTypes = { allCredentialsData: PropTypes.array }