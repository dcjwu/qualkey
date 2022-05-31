export const validateStatus = (status, isStudent = false) => {
   if (status === "ACTIVATED") return "Activated"
   if (status === "NEW" || status === "UPLOADING_TO_BLOCKCHAIN") return "New"
   if (status === "UPLOADED_TO_BLOCKCHAIN") return !isStudent ? "Uploaded" : "Activate Credentials"
   if (status === "WITHDRAWN") return "Withdrawn"
   if (status === "EXPIRED") return "Expired"
}