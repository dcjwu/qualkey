import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionEditCredentialsItem.module.scss"

const disabledFields = ["authenticatedBy", "authenticatedTitle", "authenticatedDate"]

const InstitutionEditCredentialsItem = ({
   data,
   mapping,
   mappingKey,
   formData,
   handleFormChange,
   saveValue,
   savedData,
   undoValue
}) => {

   //    placeholder={
   //       mappingKey === "studyStartedAt"
   //    || mappingKey === "graduatedAt"
   //    || mappingKey === "studyEndedAt"
   //    || mappingKey === "expiresAt"
   //       ? data[mappingKey] === null
   //          ? null
   //          : moment(data[mappingKey]).format("DD/MM/YYYY")
   //       : data[mappingKey]?.toString()
   // }

   // value={!!savedData[mappingKey] && savedData[mappingKey] !== undefined ? savedData[mappingKey] : formData[mappingKey] ? formData[mappingKey] : ""}

   return (
      <div className={styles.wrapper}>
         <div className={styles.infoItem}>
            <Text grey>{mapping.get(mappingKey)}:</Text>
            <Input disabled={disabledFields.includes(mappingKey)} inputName={mappingKey}
                   type={"text"}
                   value={formData[mappingKey]}
                   onChange={handleFormChange}/>
         </div>
         {savedData[mappingKey] && <Button thin undoEdit onClick={() => undoValue(mappingKey)}>Undo</Button>}
         {formData[mappingKey] !== data[mappingKey] && !savedData[mappingKey] ? <Button confirmEdit thin
                                                                                        onClick={() => saveValue(mappingKey, formData[mappingKey])}>Confirm</Button> : null}
      </div>
   )
}

export default InstitutionEditCredentialsItem