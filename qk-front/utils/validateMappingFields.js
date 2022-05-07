export const requiredMappingFields = [
   "graduatedName",
   "qualificationName",
   "qualificationLevel",
   "gpaFinalGrade",
   "studyStartedAt",
   "studyEndedAt",
   "graduatedAt",
   "expiresAt"
]

export const validateMappingFields = target => {
   return requiredMappingFields.every(value => {
      return target.includes(value)
   })
}