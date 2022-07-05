import { atom } from "recoil"

const initialValue = [
   {
      title: "Full Name",
      value: "graduatedName"
   },
   {
      title: "Qualification Name",
      value: "qualificationName"
   },
   {
      title: "Majors",
      value: "majors"
   },
   {
      title: "Minors",
      value: "minors"
   },
   {
      title: "Awarding Institution",
      value: "awardingInstitution"
   },
   {
      title: "Qualification Level",
      value: "qualificationLevel"
   }, {
      title: "Award Level",
      value: "awardLevel"
   },
   {
      title: "Study Language",
      value: "studyLanguage"
   }, {
      title: "Info",
      value: "info"
   }, {
      title: "GPA Final Grade",
      value: "gpaFinalGrade"
   }, {
      title: "Study Started At",
      value: "studyStartedAt"
   }, {
      title: "Study Ended At",
      value: "studyEndedAt"
   }, {
      title: "Graduated At",
      value: "graduatedAt"
   }, {
      title: "Expires At",
      value: "expiresAt"
   }, {
      title: "Email",
      value: "email"
   }
]

export const credentialsState = atom({
   key: "credentialsState",
   default: initialValue.sort((a, b) => a.title.localeCompare(b.title))
})