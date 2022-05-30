export const validateStatus = (status, isStudent = false) => {
   if (status === "ACTIVATED") return "Activated"
   if (status === "NEW") return "Activated"
   if (status === "UPLOADED_TO_BLOCKCHAIN") return !isStudent ? "Uploaded" : "Activate Credentials"
   if (status === "WITHDRAWN") return "Withdrawn"
   if (status === "EXPIRED") return "Expired"
}