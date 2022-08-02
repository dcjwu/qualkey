import { useEffect, useState } from "react"

import axios from "axios"
import moment from "moment"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useRecoilState, useResetRecoilState } from "recoil"

import { showEditCredentialsState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import { IconBackLeft, IconLoading, IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Text from "../../UI/Text/Text"
import InstitutionEditCredentialsItem from "../InstitutionEditCredentialsItem/InstitutionEditCredentialsItem"
import styles from "./InstitutionEditCredentials.module.scss"

const allKeys = [
   "authenticatedBy", "authenticatedDate",
   "authenticatedTitle",
   "awardLevel",
   "awardingInstitution",
   "expiresAt",
   "graduatedAt",
   "graduatedName",
   "info",
   "qualificationLevel",
   "qualificationName",
   "studyEndedAt",
   "studyLanguage",
   "studyStartedAt"]

const dateTimeFields = ["expiresAt", "graduatedAt", "studyEndedAt", "studyStartedAt"]

const mockDataMapping = new Map([
   ["authenticatedBy", "Authenticated by"],
   ["authenticatedDate", "Authenticated date"],
   ["authenticatedTitle", "Authenticated title"],
   ["awardLevel", "Award level"],
   ["awardingInstitution", "Awarding Institution"],
   ["expiresAt", "Expires at"],
   ["graduatedAt", "Graduated at"],
   ["graduatedName", "Full name"],
   ["info", "Info"],
   ["qualificationLevel", "Qualification level"],
   ["qualificationName", "Qualification name"],
   ["studyEndedAt", "Study ended at"],
   ["studyLanguage", "Study language"],
   ["studyStartedAt", "Study started at"]
])

const InstitutionEditCredentials = ({ data }) => {

   const router = useRouter()

   const [savedData, setSavedData] = useState({})
   const [formData, setFormData] = useState({})
   const [initialData, setInitialData] = useState({})
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [, setShowEditCredentials] = useRecoilState(showEditCredentialsState)
   const resetShowEdit = useResetRecoilState(showEditCredentialsState)

   console.log(savedData)

   /**
    * Modify incoming data per needs
    */
   useEffect(() => {
      let validValues = []
      allKeys.forEach(item => {
         validValues.push(data[item])
      })
      const result = Object.fromEntries(allKeys.map((_, i) => [allKeys[i], validValues[i]]))
      Object.keys(result).forEach(key => {
         if (moment(result[key], moment.ISO_8601, true).isValid()) {
            result[key] = moment(result[key]).format("DD/MM/YYYY")
         }
      })

      setFormData(result)
      setInitialData(result)
   }, [data])

   /**
    * Input value handling
    **/
   const handleFormChange = ({ target }) => {
      const { name, value } = target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const saveValue = (key, value) => {
      if (dateTimeFields.includes(key)) {
         const isDateValid = moment(formData[key], "DD/MM/YYYY", true).isValid()
         if (!isDateValid) {
            setError("Invalid date format")
         } else {
            const inputDate = moment(formData[key], "DD/MM/YYYY").toISOString()
            setSavedData({
               ...savedData,
               [key]: inputDate
            })
            setError("")
         }
      } else {
         setSavedData({
            ...savedData,
            [key]: value
         })
      }
   }

   const undoValue = key => {
      const savedDataCopy = { ...savedData }
      delete savedDataCopy[key]
      setSavedData(savedDataCopy)

      const initialValue = initialData[key]
      setFormData({
         ...formData,
         [key]: initialValue
      })
   }

   const validateInputs = () => {
      const newArray = allKeys.filter(item => formData[item] !== initialData[item] && !savedData[item])
      return newArray.length
   }
   /**
    * Shows details in credential history.
    **/
   const handleFormSubmit = async () => {
      setLoading(true)
      await axios.post(`${processingUrl}/credential/change`, {
         uuid: router.query.uuid,
         changedTo: Object.values(savedData),
         fieldName: Object.keys(savedData)
      }, { withCredentials: true })
         .then(response => {
            setLoading(false)
            if (response.status === 200) {
               router.reload(window.location.pathname)
               resetShowEdit()
            }
         })
         .catch(error => {
            setLoading(false)
            console.log(error)
            setError(error.response.data.message)
         })
   }

   useEffect(() => {
      return () => {
         resetShowEdit()
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   const isButtonDisabled = () => {
      return !(validateInputs() === 0 && !!Object.keys(savedData).length === true)
   }

   return (
      <div className={styles.edit}>
         <div className={styles.topWrapper}>
            <div className={styles.back} onClick={() => setShowEditCredentials(false)}>
               <IconBackLeft/>
               <Text semiBold>Back</Text>
            </div>
         </div>
         <div className={styles.wrapper}>
            {
               Object.keys(initialData).map(key => {
                  if (mockDataMapping.has(key)) {
                     return <InstitutionEditCredentialsItem key={key}
                                                            data={initialData}
                                                            formData={formData}
                                                            handleFormChange={handleFormChange}
                                                            mapping={mockDataMapping}
                                                            mappingKey={key}
                                                            savedData={savedData}
                                                            saveValue={saveValue}
                                                            undoValue={undoValue}/>
                  }
               })
            }
         </div>
         {
            error
               ? <Button error thin>
                  <div className={styles.buttonRow}>
                     <IconShare/>
                     <Text semiBold>
                        {error}
                     </Text>
                  </div>
               </Button>
               : <Button blue thin disabled={isButtonDisabled()}>
                  <div className={styles.buttonRow}>
                     {loading
                        ? <IconLoading/>
                        : <>
                           <IconShare/>
                           <Text semiBold onClick={handleFormSubmit}>
                              Confirm Changes
                           </Text>
                        </>}
                  </div>
               </Button>
         }
      </div>
   )
}

export default InstitutionEditCredentials

InstitutionEditCredentials.propTypes = { data: PropTypes.object }