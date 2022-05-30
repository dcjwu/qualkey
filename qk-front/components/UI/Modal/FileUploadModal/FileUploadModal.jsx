import { useEffect, useState } from "react"

import axios from "axios"
import { useRecoilState, useResetRecoilState } from "recoil"

import { credentialsState, currentFileState, dropdownSelectionListenerState, filenameState, filePrefixState, fileUploadErrorState, uploadModalState } from "../../../../atoms"
import { frontUrl, processingUrl, validateMappingFields } from "../../../../utils"
import { IconClose, IconLoading, IconUpload } from "../../_Icon"
import Button from "../../Button/Button"
import FileUploadDropdown from "../../Dropdown/FileUploadDropdown/FileUploadDropdown"
import Heading from "../../Heading/Heading"
import Input from "../../Input/Input"
import Text from "../../Text/Text"
import styles from "../Modal.module.scss"

const FileUploadModal = () => {

   const resetCredentialsFields = useResetRecoilState(credentialsState)
   const resetCurrentFile = useResetRecoilState(currentFileState)
   const resetFilePrefix = useResetRecoilState(filePrefixState)
   const resetFileName = useResetRecoilState(filenameState)

   const [credentialsFields, setCredentialsFields] = useRecoilState(credentialsState)
   const [openModal, setOpenModal] = useRecoilState(uploadModalState)
   const [fileUploadModalError, setFileUploadModalError] = useRecoilState(fileUploadErrorState)
   const [fileUploadModalErrorButton, setFileUploadModalErrorButton] = useState("")
   const [dropdownSelectionListener, setDropdownSelectionListener] = useRecoilState(dropdownSelectionListenerState)
   const [currentFile, setCurrentFile] = useRecoilState(currentFileState)
   const [filePrefix, setFilePrefix] = useRecoilState(filePrefixState)
   const [fileName, setFileName] = useRecoilState(filenameState)
   const [parsedValuesFromUpload, setParsedValuesFromUpload] = useState([])
   const [mappingToValues, setMappingToValues] = useState([])
   const [uploadSuccess, setUploadSuccess] = useState(false)
   const [loading, setLoading] = useState(false)

   //TODO: Make active field in dropdown according to figma ui — BLUE?

   //TODO: Make scroll to chosen option dropdown row so it is more user friendly.

   /**
    * File upload to front-end processing.
    **/
   const uploadFileToClient = async event => {
      const fileType = event.target.files[0]?.type
      if (fileType === "text/csv"
         || fileType === "application/vnd.ms-excel"
         || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
         setCurrentFile(event.target.files[0])
         setFileName(event.target.files[0].name)
         const formData = new FormData()
         formData.append("uploadedFile", event.target.files[0])
         try {
            const response = await axios.post(`${frontUrl}/api/file-upload`, formData, { headers: { "Content-type": "multipart/form-data" } })
            setParsedValuesFromUpload(response.data.file)
            setFilePrefix(response.data.prefix)
         } catch (error) {
            setFileUploadModalError(error?.response?.statusText)
         }
      } else {
         setFileUploadModalError("Unsupported file type")
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
      if (dropdownTitle[dropdownTitle.length - 1] === "*") {
         dropdownTitle = dropdownTitle.slice(0, -1)
      }
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
    * Sends upload request to processing and delete file from front-end folder.
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
                  const data = JSON.stringify(`${filePrefix}-${fileName}`)
                  axios.post(`${frontUrl}/api/file-delete`, data, { headers: { "Content-type": "application/json" } })
                     .then(response => {
                        if (response.data === "OK") {
                           setLoading(false)
                           setUploadSuccess(true)
                           resetCurrentFile()
                           resetFilePrefix()
                           resetFileName()
                        }
                     })
                     .catch(error => {
                        setLoading(false)
                        setFileUploadModalErrorButton(error.response.statusText)
                     })
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
               <div className={styles.wrapperInner}
                    style={{ height: parsedValuesFromUpload.length ? "100%" : "", paddingBottom: "6rem" }}>
                  <div className={styles.top}>
                     <Heading h2 modal success
                              style={{ marginBottom: "0" }}>Success!</Heading>
                  </div>
               </div>
            </div>
         </div>
         : <div className={styles.modal} onClick={closeModalOutside}>
            <div className={styles.wrapper}
                 style={{ height: parsedValuesFromUpload.length ? "90%" : "" }} onClick={event => event.stopPropagation()}>
               <IconClose onClick={closeModal}/>
               <div className={styles.wrapperInner} style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
                  <div className={styles.top}>
                     <Heading blue h2 modal>Multi-Upload</Heading>
                     {fileUploadModalError && <Text error large>{fileUploadModalError}</Text>}
                     <Input fileName={fileName} inputName="csvUploader" isFileUploaded={!!parsedValuesFromUpload.length}
                            type={"fileUpload"}
                            onChange={uploadFileToClient}/>
                  </div>
                  {
                     !!parsedValuesFromUpload.length
                     && <>
                        <div className={styles.middle}>
                           {parsedValuesFromUpload.map((value, index) => (
                              <div key={value} className={styles.row}>
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