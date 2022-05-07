import { useEffect, useRef, useState } from "react"

import axios from "axios"
import { useRecoilState, useResetRecoilState } from "recoil"

import { credentialsState, currentFileState, dropdownSelectionListenerState, filenameState, filePrefixState, fileUploadErrorState, uploadModalState } from "../../../../atoms"
import { processingUrl, validateMappingFields } from "../../../../utils"
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
   const [dropdownSelectionListener, setDropdownSelectionListener] = useRecoilState(dropdownSelectionListenerState)
   const [currentFile, setCurrentFile] = useRecoilState(currentFileState)
   const [filePrefix, setFilePrefix] = useRecoilState(filePrefixState)
   const [fileName, setFileName] = useRecoilState(filenameState)
   const [parsedValuesFromUpload, setParsedValuesFromUpload] = useState([])
   const [mappingToValues, setMappingToValues] = useState([])
   const [uploadSuccess, setUploadSuccess] = useState(false)

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
      mappingToValues[index] = {
         title: event.target.innerText,
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
   const resetDropdown = index => {
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
         const mapping = mappingToValues.map(mapping => mapping?.value).join(",")
         const formData = new FormData()
         formData.append("file", currentFile)
         formData.append("mapping", mapping)

         axios.post(`${processingUrl}/upload`, formData, { withCredentials: true })
            .then(response => {
               if (response.status === 201) {
                  resetCurrentFile()

                  const data = JSON.stringify(`${filePrefix}-${fileName}`)
                  axios.post("api/file-delete", data, { headers: { "Content-type": "application/json" } })
                     .then(response => {
                        if (response.data === "OK") {
                           setUploadSuccess(true)
                        }
                     })
                     .catch(error => setFileUploadModalError(error.response.statusText))
               }
            })
            .catch(error => {
               console.log(error)
               setFileUploadModalError(error.response.statusText)
            })
      } else {
         setFileUploadModalError("Please, choose all required fields")
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
   }, [dropdownSelectionListener.length])

   /**
    * Remove error inside modal.
    * @desc Sets error to empty string when modal open/close or when uploaded file is mapped.
    **/
   useEffect(() => {
      setFileUploadModalError("")
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
               <svg className={styles.close} fill="none" height="46"
                    viewBox="0 0 46 46"
                    width="46"
                    xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                  <path d="M31.1424 31.4853C35.8287 26.799 35.8287 19.201 31.1424 14.5147C26.4561 9.82843 18.8581 9.82843 14.1718 14.5147C9.48551 19.201 9.48551 26.799 14.1718 31.4853C18.8581 36.1716 26.4561 36.1716 31.1424 31.4853Z"
                     stroke="#737373" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M19.1211 26.5356L26.1922 19.4646" stroke="#737373" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M19.1211 19.4644L26.1922 26.5354" stroke="#737373" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
               </svg>
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
               <svg className={styles.close} fill="none" height="46"
                    viewBox="0 0 46 46"
                    width="46"
                    xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                  <path d="M31.1424 31.4853C35.8287 26.799 35.8287 19.201 31.1424 14.5147C26.4561 9.82843 18.8581 9.82843 14.1718 14.5147C9.48551 19.201 9.48551 26.799 14.1718 31.4853C18.8581 36.1716 26.4561 36.1716 31.1424 31.4853Z"
                     stroke="#737373" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M19.1211 26.5356L26.1922 19.4646" stroke="#737373" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M19.1211 19.4644L26.1922 26.5354" stroke="#737373" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
               </svg>
               <div className={styles.wrapperInner} style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
                  <div className={styles.top}>
                     <Heading blue h2 modal>Multi-Upload</Heading>
                     <Text modal>You have confirmed the list of credentials
                        are ready to be authenticated.</Text>
                     <Input fileUpload fileName={fileName} inputName="csvUploader"
                            isFileUploaded={!!parsedValuesFromUpload.length}
                            onChange={uploadFileToClient}/>
                     {fileUploadModalError && <Text error>{fileUploadModalError}</Text>}
                  </div>
                  {
                     !!parsedValuesFromUpload.length
                     && <>
                        <div className={styles.middle}>
                           {parsedValuesFromUpload.map((value, index) => (
                              <div key={value} className={styles.row}>
                                 <Input readOnly text inputName={value}
                                        placeholder={value}
                                        value={value}/>
                                 <FileUploadDropdown key={value} handleOption={handleOption}
                                                     resetDropdown={resetDropdown} valueIndex={index}/>
                              </div>
                           ))}
                        </div>
                        <Button blue onClick={handleSubmitMapping}>
                           <svg fill="none" height="32" viewBox="0 0 32 32"
                                width="32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 26H9C7.14348 26 5.36301 25.2625 4.05025 23.9497C2.7375 22.637 2 20.8565 2 19C2 17.1435 2.7375 15.363 4.05025 14.0503C5.36301 12.7375 7.14348 12 9 12C9.58566 11.9998 10.1692 12.0711 10.7375 12.2125"
                                 stroke="white" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                              <path d="M10 16C10 14.4155 10.3765 12.8536 11.0986 11.4432C11.8206 10.0327 12.8675 8.81406 14.1529 7.88758C15.4383 6.96109 16.9255 6.35333 18.4919 6.11437C20.0583 5.87541 21.6591 6.0121 23.1623 6.51317C24.6655 7.01424 26.0281 7.86534 27.1378 8.99635C28.2476 10.1274 29.0727 11.5059 29.5451 13.0183C30.0176 14.5308 30.1239 16.1338 29.8552 17.6954C29.5866 19.257 28.9507 20.7324 28 22"
                                 stroke="white" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                              <path d="M14.7617 20.2375L18.9992 16L23.2367 20.2375" stroke="white" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="1.5"/>
                              <path d="M19 26V16" stroke="white" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="1.5"/>
                           </svg>
                           <span>Upload Now</span>
                        </Button>
                     </>
                  }
               </div>
            </div>
         </div>
   )
}

export default FileUploadModal