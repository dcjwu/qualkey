import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import InstitutionDashboardItem from "../InstitutionItem/InstitutionDashboardItem"
import styles from "./InstitutionDashboard.module.scss"

const mockData = [
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Andrew Feinstein",
      diploma: "BA Computer Science and Engineering",
      status: "Uploaded",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Brian Herrera",
      diploma: "MA International Relations",
      status: "Activated",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Isabelle Portre",
      diploma: "BA Computer Science and Engineering",
      status: "Withdrawn",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Adrian Portre",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Adrian Gibbs",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "John Black",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Joseph White",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Sergio Aguero",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363
   }
]

const InstitutionDashboard = () => {
   return (
      <>
         <div className={styles.searchWrapper}>
            <Text blackSpan semiBold>Showing <span>5</span> from <span>5</span> results</Text>
            <Input type={"search"}/>
         </div>
         <div className={styles.contentWrapper}>
            {mockData.map(data => (
               <InstitutionDashboardItem key={data.student} data={data}/>
            ))}
         </div>
      </>
   )
}

export default InstitutionDashboard