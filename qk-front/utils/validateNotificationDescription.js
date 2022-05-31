export const validateNotificationDescription = type => {
   if (type === "REVIEW_UPLOAD") return "Your colleague has uploaded new credentials that require approval"
   if (type === "REVIEW_WITHDRAWAL") return "Your colleague has put forward a request to withdraw credentials"
   if (type === "REVIEW_CHANGE_REQUEST") return ""
}