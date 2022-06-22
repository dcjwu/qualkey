import { useEffect, useState } from "react"

import axios from "axios"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"
import { useRecoilState, useResetRecoilState } from "recoil"

import { formShareState, showShareModalState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import StudentDashboardItem from "../../DashboardItem/StudentDashboardItem"
import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./StudentDashboard.module.scss"

const StudentDashboard = ({ data }) => {

   const router = useRouter()
   const [credentials, setCredentials] = useState(data)
   const resetFormShare = useResetRecoilState(formShareState)
   const [searchValue, setSearchValue] = useState("")
   const [formShare, setFormShare] = useRecoilState(formShareState)
   const [, setShowShareModal] = useRecoilState(showShareModalState)

   /**
    * Get data from server
    */
   const getMoreCredentials = async () => {
      axios.get(`${processingUrl}/credential?offset=${credentials.length}&limit=10`, { withCredentials: true })
         .then(response => {
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
    * Add share credential handler
    */
   const handleCredentialsToShare = id => {
      setFormShare([
         ...formShare, id
      ])
   }

   /**
    * Delete share credential handler
    */
   const deleteCredentialToShare = id => {
      const newArray = formShare.filter(item => item !== id)
      setFormShare(newArray)
   }

   /**
    * Shows share modal
    */
   const handleShowShareModal = () => {
      setShowShareModal(true)
   }

   /**
    * Reset form on component unmount
    */
   useEffect(() => {
      return () => {
         resetFormShare()
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <>
         <div className={styles.searchShareWrapper}>
            <Input type={"search"} value={searchValue} onChange={handleInputChange}
                   onKeyDown={handleSubmitSearch}/>
            <Button blue thin disabled={formShare.length === 0}
                    onClick={handleShowShareModal}>
               <div className={styles.buttonRow}>
                  <IconShare/>
                  <Text bold>Share Selected {formShare.length !== 0 ? `(${formShare.length})` : null}</Text>
               </div>
            </Button>
         </div>
         <div className={styles.contentWrapper}>
            <InfiniteScroll dataLength={credentials.length} hasMore={true} loader={"Loading"}
                            next={getMoreCredentials}>
               {credentials ? credentials.map(data => (
                  <StudentDashboardItem key={data.uuid} data={data} deleteCredentialToShare={deleteCredentialToShare}
                                        handleCredentialsToShare={handleCredentialsToShare}/>
               )) : null}
            </InfiniteScroll>
         </div>
      </>
   )
}

export default StudentDashboard