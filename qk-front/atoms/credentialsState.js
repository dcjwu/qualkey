import { atom } from "recoil"

export const credentialsState = atom({
   key: "credentialsState",
   default: [
      {
         title: "Certificate ID",
         value: "certificateId"
      },
      {
         title: "Full Name",
         value: "graduatedName"
      },
      {
         title: "Authenticated By",
         value: "authenticatedBy"
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
         title: "Authenticated Title",
         value: "authenticatedTitle"
      },
      {
         title: "Awarding Institution",
         value: "awardingInstitution"
      },
      {
         title: "Qualification Level",
         value: "qualificationLevel"
      },   {
         title: "Award Level",
         value: "awardLevel"
      },
      {
         title: "Study Language",
         value: "studyLanguage"
      },   {
         title: "Info",
         value: "info"
      },   {
         title: "GPA Final Grade",
         value: "gpaFinalGrade"
      },   {
         title: "Authenticated At",
         value: "authenticatedAt"
      },   {
         title: "Study Started At",
         value: "studyStartedAt"
      },   {
         title: "Study Ended At",
         value: "studyEndedAt"
      },   {
         title: "Graduated At",
         value: "graduatedAt"
      },   {
         title: "Expires At",
         value: "expiresAt"
      },
   ].sort((a, b) => a.title.localeCompare(b.title))
})