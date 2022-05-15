import PropTypes from "prop-types"

import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionEditCredentialsItem.module.scss"

const InstitutionEditCredentialsItem = ({
   mapping,
   mappingKey,
   data,
   formData,
   handleFormChange,
   index,
   saveValue,
   savedData,
   resetValue,
   isInputValid
}) => {

   return (
      <div className={styles.wrapper}>
         <div className={styles.infoItem}>
            <Text grey>{mapping.get(mappingKey)}:</Text>
            <Input inputName={mappingKey} placeholder={data[mappingKey].toString()} style={{
               borderBottom: isInputValid.includes(mappingKey) ? "1px solid #ef4444" : "",
               color: isInputValid.includes(mappingKey) ? "#ef4444" : ""
            }}
                   type={"text"}
                   value={!!savedData[mappingKey] && savedData[mappingKey] !== undefined ? savedData[mappingKey] : formData[mappingKey] ? formData[mappingKey] : ""}
                   onChange={(event) => handleFormChange(event, index)}/>
         </div>
         {savedData[mappingKey] ? <Button thin undoEdit onClick={() => resetValue(mappingKey)}>Undo</Button> : null}
         {formData[mappingKey] && !savedData[mappingKey] ?
            <Button confirmEdit thin onClick={() => saveValue(mappingKey)}>Confirm</Button> : null}
      </div>
   )
}

export default InstitutionEditCredentialsItem

InstitutionEditCredentialsItem.propTypes = {
   mapping: PropTypes.object.isRequired,
   mappingKey: PropTypes.string.isRequired,
   data: PropTypes.object.isRequired,
   formData: PropTypes.object.isRequired,
   handleFormChange: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
   saveValue: PropTypes.func.isRequired,
   savedData: PropTypes.object.isRequired,
   resetValue: PropTypes.func.isRequired,
   isInputValid: PropTypes.array.isRequired
}