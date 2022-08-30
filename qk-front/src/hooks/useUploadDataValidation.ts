import React from "react"

import moment from "moment/moment"

import type { ParsedDataType, UseUploadDataValidationType, ValidationErrorType } from "@customTypes/hooks"
import type { InstitutionMappingType } from "@interfaces/institution.interface"

const notEmptyFields = [
   "email",
   "awardingInstitution",
   "expiresAt",
   "graduatedAt",
   "graduatedFullName",
   "graduatedFirstName",
   "graduatedLastName",
   "gpaFinalGrade",
   "qualificationLevel",
   "qualificationName",
   "studyEndedAt",
   "studyLanguage",
   "studyStartedAt"
]

const dateFields = [
   "expiresAt",
   "graduatedAt",
   "studyEndedAt",
   "studyStartedAt"
]

/**
 * Every row data validation handler
 */
export const useUploadDataValidation = (): UseUploadDataValidationType => {
   const [data, setData] = React.useState<ParsedDataType[]>([])
   const [validationErrors, setValidationErrors] = React.useState<ValidationErrorType[]>([])

   const checkIsFieldEmpty = React.useCallback((value: string, row: number): string | undefined => {
      if (value === "") return `empty on row ${row}`
      return
   }, [])

   const checkIfStringIsDate = React.useCallback((value: string, row: number) => {
      const date = moment(value)
      if (!date.isValid()) return `not valid date on row ${row}`
   }, [])

   const handleValidation = React.useCallback((institutionDataMapping: InstitutionMappingType[], data: Array<{ [k: string]: string }>): void => {
      const parsedData: ParsedDataType[] = []
      const errorData: ValidationErrorType[] = []

      for (let i = 0; i < institutionDataMapping.length; i++) {
         const key = institutionDataMapping[i]["originalColumnName"]
         const originalKey = institutionDataMapping[i]["qualkeyName"]

         const dataArray = data.map((item) => item[key])
         parsedData.push({
            key: key,
            originalKey,
            values: dataArray,
         })
         errorData.push({
            columnName: key,
            errors: []
         })
      }

      parsedData.forEach((item) => {
         if (notEmptyFields.includes(item.originalKey)) {
            item.values.forEach((value, index) => {
               const validationResult = checkIsFieldEmpty(value, index + 1)
               if (validationResult) {
                  const errorColumnIndex = errorData.findIndex((value) => value.columnName == item.key)
                  errorData[errorColumnIndex].errors.push(validationResult)
               }
            })
         }
         if (dateFields.includes(item.originalKey)) {
            item.values.forEach((value, index) => {
               const validationResult = checkIfStringIsDate(value, index + 1)
               if (validationResult) {
                  const errorColumnIndex = errorData.findIndex((value) => value.columnName == item.key)
                  errorData[errorColumnIndex].errors.push(validationResult)
               }
            })
         }
      })

      setValidationErrors(errorData)
      setData(parsedData)

   }, [checkIsFieldEmpty, checkIfStringIsDate])

   return [data, validationErrors, handleValidation]
}