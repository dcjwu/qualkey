import { IconCircleBlue } from "../components/UI/_Icon"

export const validateNotificationType = type => {
   if (type === "REVIEW_UPLOAD") return <IconCircleBlue/>
   if (type === "REVIEW_WITHDRAWAL") return <IconCircleBlue/>
   if (type === "REVIEW_CHANGE_REQUEST") return <IconCircleBlue/>
}