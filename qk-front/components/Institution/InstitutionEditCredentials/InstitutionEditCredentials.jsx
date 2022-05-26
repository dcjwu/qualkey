import { useState } from "react"

import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { showEditCredentialsState } from "../../../atoms"
import { IconBackLeft, IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Text from "../../UI/Text/Text"
import InstitutionEditCredentialsItem from "../InstitutionEditCredentialsItem/InstitutionEditCredentialsItem"
import styles from "./InstitutionEditCredentials.module.scss"

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

   const [savedData, setSavedData] = useState({})
   const [formData, setFormData] = useState({})
   const [, setActiveIndex] = useState(null)
   const [isInputValid, setIsInputValid] = useState([])
   const [, setShowEditCredentials] = useRecoilState(showEditCredentialsState)

   /**
    * Inout value handling.
    **/
   const handleFormChange = ({ target }, index) => {
      setActiveIndex(index)
      const { name, value } = target
      setFormData({
         ...formData,
         [name]: value
      })
      if (value === "") {
         const formDataCopy = { ...formData }
         delete formDataCopy[name]
         setFormData(formDataCopy)
      }
   }

   /**
    * Saves edited value.
    **/
   const saveValue = inputName => {
      setSavedData({
         ...savedData,
         [inputName]: formData[inputName]
      })
      const formDataCopy = { ...formData }
      delete formDataCopy[inputName]
      setFormData(formDataCopy)
   }

   /**
    * Resets changed value to initial state.
    **/
   const resetValue = inputName => {
      const savedDataCopy = { ...savedData }
      delete savedDataCopy[inputName]
      setSavedData(savedDataCopy)
      const updatedValidationArray = isInputValid.filter(value => value === [inputName])
      setIsInputValid(updatedValidationArray)
      const formDataCopy = { ...formData }
      delete formDataCopy[inputName]
      setFormData(formDataCopy)
   }

   /**
    * Shows details in credential history.
    **/
   const handleFormSubmit = () => {
      const notValidFieldsLength = validateInputs()
      if (notValidFieldsLength === 0) {
         console.log(JSON.stringify(savedData))
         //TODO: Axios post request.
         //TODO: setSuccess and setLoading to handle button correctly.
         //TODO: Go back button imitation and reset all state to default value!
      } else {
         console.log("WTF, please!")
      }
   }

   /**
    * Form submit handling.
    **/
   const validateInputs = () => {
      const notValidatedFields = []
      Object.keys(formData).forEach(key => {
         notValidatedFields.push(key)
      })
      setIsInputValid([...notValidatedFields])
      return [...notValidatedFields].length
   }

   return (
      <div className={styles.edit}>
         <div className={styles.topWrapper}>
            <Text large semiBold>Edit Credentials</Text>
            <div className={styles.back} onClick={() => setShowEditCredentials(false)}>
               <IconBackLeft/>
               <Text semiBold>Back</Text>
            </div>
         </div>
         <div className={styles.wrapper}>
            {
               Object.keys(data).map((key, index) => {
                  if (mockDataMapping.has(key)) {
                     return <InstitutionEditCredentialsItem key={key}
                                                            data={data}
                                                            formData={formData}
                                                            handleFormChange={handleFormChange}
                                                            index={index}
                                                            isInputValid={isInputValid}
                                                            mapping={mockDataMapping}
                                                            mappingKey={key}
                                                            resetValue={resetValue}
                                                            savedData={savedData}
                                                            saveValue={saveValue}/>
                  }
               })
            }
         </div>
         <Button blue thin disabled={!Object.keys(savedData).length}
                 onClick={handleFormSubmit}>
            <div className={styles.buttonRow}>
               <IconShare/>
               <Text semiBold>Confirm Changes</Text>
            </div>
         </Button>
      </div>
   )
}

export default InstitutionEditCredentials

InstitutionEditCredentials.propTypes = { data: PropTypes.object }