import { useEffect, useState } from "react"

import axios from "axios"
import Papa from "papaparse"
import { useRecoilState, useResetRecoilState } from "recoil"

import { credentialsState, currentFileState, dropdownSelectionListenerState, filenameState, fileUploadErrorState, uploadModalState } from "../../../atoms"
import { processingUrl, validateMappingFields } from "../../../utils"
import { IconClose, IconLoading, IconUpload } from "../_Icon"
import Button from "../Button/Button"
import FileUploadDropdown from "../Dropdown/FileUploadDropdown/FileUploadDropdown"
import Heading from "../Heading/Heading"
import Input from "../Input/Input"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const FileUploadModal = () => {

   const resetCredentialsFields = useResetRecoilState(credentialsState)
   const resetCurrentFile = useResetRecoilState(currentFileState)
   const resetFileName = useResetRecoilState(filenameState)

   const [credentialsFields, setCredentialsFields] = useRecoilState(credentialsState)
   const [openModal, setOpenModal] = useRecoilState(uploadModalState)
   const [fileUploadModalError, setFileUploadModalError] = useRecoilState(fileUploadErrorState)
   const [fileUploadModalErrorButton, setFileUploadModalErrorButton] = useState("")
   const [dropdownSelectionListener, setDropdownSelectionListener] = useRecoilState(dropdownSelectionListenerState)
   const [currentFile, setCurrentFile] = useRecoilState(currentFileState)
   const [fileName, setFileName] = useRecoilState(filenameState)
   const [parsedValuesFromUpload, setParsedValuesFromUpload] = useState([])
   const [mappingToValues, setMappingToValues] = useState([])
   const [uploadSuccess, setUploadSuccess] = useState(false)
   const [loading, setLoading] = useState(false)
   const [step, setStep] = useState(1)

   /**
    * File upload to front-end processing.
    **/
   const uploadFileToClient = async event => {
      const fileType = event.target.files[0].type
      if (fileType === "text/csv" || fileType === "application/csv") {
         setCurrentFile(event.target.files[0])
         setFileName(event.target.files[0].name)
         Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
               setParsedValuesFromUpload(results.meta.fields)
               setStep(prevState => prevState + 1)
            },
            error: (error) => {
               setFileUploadModalError(error.message)
            }
         })
      } else {
         setFileUploadModalError("Invalid file format. Make sure you have selected a valid file and try again.")
      }
   }

   /**
    * Close modal handler.
    */
   const closeModal = () => {
      setOpenModal(false)
      resetCredentialsFields()
      setDropdownSelectionListener([])
   }

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   /**
    * Creates array with chosen values.
    **/
   const handleOption = (event, index) => {
      let dropdownTitle = event.target.innerText
      mappingToValues[index] = {
         title: dropdownTitle,
         value: event.target.getAttribute("value")
      }
      setMappingToValues([...mappingToValues])
   }

   /**
    * Resets dropdown.
    **/
   const resetDropdown = (index) => {
      if (mappingToValues[index].value !== "graduatedName") {
         setCredentialsFields([...credentialsFields, mappingToValues[index]]
            .sort((a, b) => a.title
               .localeCompare(b.title)))
         mappingToValues[index] = undefined
         setMappingToValues([...mappingToValues])
      }
   }

   /**
    * Sends upload request to process ng and delete file from front-end folder.
    **/
   const handleSubmitMapping = async () => {
      const arrayOfValues = mappingToValues.map(mapping => mapping?.value)
      const validation = validateMappingFields(arrayOfValues)

      if (validation) {
         setFileUploadModalError("")
         setFileUploadModalErrorButton("")
         const mapping = mappingToValues.map(mapping => mapping?.value).join(",")
         const formData = new FormData()
         formData.append("file", currentFile)
         formData.append("mapping", mapping)

         setLoading(true)
         await axios.post(`${processingUrl}/upload`, formData, { withCredentials: true })
            .then(response => {
               if (response.status === 201) {
                  setLoading(false)
                  setUploadSuccess(true)
                  resetCurrentFile()
                  resetFileName()
               }
            })
            .catch(error => {
               console.log(error)
               setLoading(false)
               setFileUploadModalErrorButton(error.response.statusText || error.message)
            })
      } else {
         setFileUploadModalErrorButton("You must match the required fields first!")
      }
   }

   /**
    * Creates new array when data is parsed.
    **/
   useEffect(() => {
      setMappingToValues(new Array(parsedValuesFromUpload.length))
   }, [parsedValuesFromUpload.length])

   /**
    * Removes chosen items from dropdown.
    **/
   useEffect(() => {
      if (dropdownSelectionListener.length !== 0) {
         const filteredDropdown = credentialsFields
            .filter(credentials => {
               return !mappingToValues
                  .find(mapping => {
                     return mapping?.value !== undefined
                        && credentials.value === mapping.value
                        && credentials.value !== "graduatedName"
                  })
            })
         setCredentialsFields(filteredDropdown)
         if (fileUploadModalErrorButton) {
            setFileUploadModalErrorButton("")
         }
      }
   }, [dropdownSelectionListener.length]) // eslint-disable-line react-hooks/exhaustive-deps

   /**
    * Remove error inside modal.
    **/
   useEffect(() => {
      setFileUploadModalError("")
      setFileUploadModalErrorButton("")
   }, [openModal, parsedValuesFromUpload]) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      uploadSuccess
         ? <div className={styles.modal} onClick={closeModalOutside}>
            <div className={styles.wrapper}>
               <IconClose onClick={closeModal}/>
               <ModalSteps step={3} totalSteps={3}/>
               <div className={styles.wrapperInner}
                    style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
                  <div className={styles.top}>
                     <Heading blue h2 medium
                              modal
                              style={{ marginBottom: "1rem" }}>Credentials Upload Complete
                     </Heading>
                     <Text style={{ marginBottom: "3.2rem" }}>You will be notified as soon as you organisation’s Assigned
                        Approver confirms these
                        credentials. You many now return to the dashboard</Text>
                     <Button blue thin style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0 auto",
                        width: "fit-content",
                        padding: "1.2rem 3.2rem"
                     }}
                             onClick={closeModal}>
                        Return to Dashboard
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         : <div className={styles.modal} onClick={closeModalOutside}>
            <div className={styles.wrapper}
                 style={{ height: parsedValuesFromUpload.length ? "90%" : "" }} onClick={event => event.stopPropagation()}>
               <IconClose onClick={closeModal}/>
               <ModalSteps step={step} totalSteps={3}/>
               <div className={styles.wrapperInner} style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
                  <div className={`${styles.top} ${parsedValuesFromUpload.length ? styles.multi : ""}`}>
                     <Heading blue h2 modal>Multi-Upload</Heading>
                     {fileUploadModalError && <Text error large>{fileUploadModalError}</Text>}
                     <Input fileName={fileName} inputName="csvUploader" isFileUploaded={!!parsedValuesFromUpload.length}
                            type={"fileUpload"}
                            onChange={uploadFileToClient}/>
                  </div>
                  {
                     !!parsedValuesFromUpload.length
                     && <>
                        <div className={styles.titles}>
                           <Text grey small>Column Title</Text>
                           <Text grey small>Values</Text>
                        </div>
                        <div className={styles.middle}>
                           {parsedValuesFromUpload.map((value, index) => (
                              <div key={value} className={`${styles.row} ${styles.massUpload}`}>
                                 <Input readOnly inputName={value} type={"text"}
                                        value={value}/>
                                 <FileUploadDropdown key={value} handleOption={handleOption}
                                                     resetDropdown={resetDropdown} valueIndex={index}/>
                              </div>
                           ))}
                        </div>
                        {
                           fileUploadModalErrorButton
                              ? <Button errorModal onClick={handleSubmitMapping}>
                                 <IconUpload/>
                                 <span>{fileUploadModalErrorButton}</span>
                              </Button>
                              : loading
                                 ? <Button disabled>
                                    <IconLoading/>
                                 </Button>
                                 : <Button blue onClick={handleSubmitMapping}>
                                    <IconUpload/>
                                    <span>Upload Now</span>
                                 </Button>
                        }
                     </>
                  }
               </div>
            </div>
         </div>
   )
}

export default FileUploadModal