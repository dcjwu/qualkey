import { useEffect, useRef, useState } from "react"

import axios from "axios"
import { useRecoilState, useResetRecoilState } from "recoil"

import { credentialsState, currentFileState, dropdownSelectionListenerState, filenameState, filePrefixState, fileUploadErrorState, uploadModalState } from "../../../../atoms"
import { processingUrl, validateMappingFields } from "../../../../utils"
import { IconClose, IconLoading, IconUpload } from "../../_Icon"
import Button from "../../Button/Button"
import FileUploadDropdown from "../../Dropdown/FileUploadDropdown/FileUploadDropdown"
import Heading from "../../Heading/Heading"
import Input from "../../Input/Input"
import Text from "../../Text/Text"
import styles from "./FileUploadModal.module.scss"

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
    * File upload processing.
    * @desc Validates file type and sends to api/ endpoint request to parse file.
    * @param event Click event.
    * @returns Parsed data from uploaded file.
    * @throws Shows error response in UI.
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
            const response = await axios.post("/api/file-upload", formData, { headers: { "Content-type": "multipart/form-data" } })
            setParsedValuesFromUpload(response.data.file)
            setFilePrefix(response.data.prefix)
         } catch (error) {
            setFileUploadModalError(error?.response?.statusText)
         }
      } else {
         setFileUploadModalError("Unsupported file type")
      }
   }

   const closeModal = () => {
      setOpenModal(false)
      resetCredentialsFields()
      setDropdownSelectionListener([])
   }

   /**
    * Creates array with chosen values.
    * @desc Sets chosen values to array in the order of mapped data.
    * @param event Choose option event.
    * @param index Index of chosen option.
    * @returns Array of mapped data.
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
    * @desc Resets dropdown values by adding chosen value back to dropdown array.
    * @param index Index of chosen option.
    * @returns New array of sorted data for dropdown.
    **/
   const resetDropdown = (index) => {
      setCredentialsFields([...credentialsFields, mappingToValues[index]]
         .sort((a, b) => a.title
            .localeCompare(b.title)))
      mappingToValues[index] = undefined
      setMappingToValues([...mappingToValues])
   }

   /**
    * Sends upload request to processing.
    * @desc Validates chosen values, sends upload request to processing and delete file request to /api/ endpoint.
    * @returns Success state to be shown in UI.
    * @throws Logs request or shows in UI validation errors.
    **/
   const handleSubmitMapping = () => {
      const arrayOfValues = mappingToValues.map(mapping => mapping?.value)
      const validation = validateMappingFields(arrayOfValues)

      if (!validation) {
         setFileUploadModalError("")
         setFileUploadModalErrorButton("")
         const mapping = mappingToValues.map(mapping => mapping?.value).join(",")
         const formData = new FormData()
         formData.append("file", currentFile)
         formData.append("mapping", mapping)

         setLoading(true)
         axios.post(`${processingUrl}/upload`, formData, { withCredentials: true })
            .then(response => {
               if (response.status === 201) {
                  resetCurrentFile()

                  const data = JSON.stringify(`${filePrefix}-${fileName}`)
                  axios.post("api/file-delete", data, { headers: { "Content-type": "application/json" } })
                     .then(response => {
                        if (response.data === "OK") {
                           setLoading(false)
                           setUploadSuccess(true)
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
    * @desc Create array of the same length as parsed keys.
    * @returns Fixed length new empty array.
    **/
   useEffect(() => {
      setMappingToValues(new Array(parsedValuesFromUpload.length))
   }, [parsedValuesFromUpload.length])

   /**
    * Removes chosen items from dropdown.
    * @desc Filters dropdown array on a certain condition.
    * @desc Listens to another array which receives inside every change in dropdown selections.
    * @returns New filtered array.
    **/
   useEffect(() => {
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
   }, [dropdownSelectionListener.length])

   /**
    * Remove error inside modal.
    * @desc Sets error to empty string when modal open/close or when uploaded file is mapped.
    **/
   useEffect(() => {
      setFileUploadModalError("")
      setFileUploadModalErrorButton("")
   }, [openModal, parsedValuesFromUpload])

   /**
    * Allows to close modal by clicking outside it.
    **/
   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (openModal && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setOpenModal(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)

         resetCurrentFile()
         resetFilePrefix()
         resetFileName()
      }
   }, [openModal])

   return (
      uploadSuccess
         ? <div className={styles.modal}>
            <div ref={outsideClickRef} className={styles.wrapper}>
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
         : <div className={styles.modal}>
            <div ref={outsideClickRef} className={styles.wrapper}
                 style={{ height: parsedValuesFromUpload.length ? "90%" : "" }}>
               <IconClose onClick={closeModal}/>
               <div className={styles.wrapperInner} style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
                  <div className={styles.top}>
                     <Heading blue h2 modal>Multi-Upload</Heading>
                     {fileUploadModalError && <Text error large>{fileUploadModalError}</Text>}
                     <Input fileUpload fileName={fileName} inputName="csvUploader"
                            isFileUploaded={!!parsedValuesFromUpload.length}
                            onChange={uploadFileToClient}/>
                  </div>
                  {
                     !!parsedValuesFromUpload.length
                     && <>
                        <div className={styles.middle}>
                           {parsedValuesFromUpload.map((value, index) => (
                              <div key={value} className={styles.row}>
                                 <Input readOnly text inputName={value}
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