import moment from "moment/moment"

/**
 * Local date formatter
 */
export const formatDate = (format: string, date?: Date): string => {
   if (!date) return "Not valid date"
   return moment.utc(date).local().format(format)
}