export const validateNotificationTitle = type => {
   if (type === "REVIEW_UPLOAD") return "Upload of Credentials"
   if (type === "REVIEW_WITHDRAWAL") return "Withdraw of Credentials"
   if (type === "REVIEW_CHANGE_REQUEST") return "Credential Change Request"
}