import { requiredMappingFields } from "../../../../utils"

const FileUploadDropdownItem = ({ data, handleChooseOptionDropdown }) => {
   if (requiredMappingFields.includes(data.value)) {
      return <li key={data.value} value={data.value}
                 onClick={handleChooseOptionDropdown}>{data.title}<span>*</span></li>
   }
   return <li key={data.value} value={data.value}
              onClick={handleChooseOptionDropdown}>{data.title}</li>
}

export default FileUploadDropdownItem