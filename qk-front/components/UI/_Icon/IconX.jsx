export const IconX = ({ optionDropdown, ...otherProps }) => {
   return (
      <svg fill="none" height="10" {...otherProps}
           viewBox="0 0 9 10"
           width="9"
           xmlns="http://www.w3.org/2000/svg">
         <path d="M1.12109 8.53516L8.19216 1.46409" stroke="#737373" strokeLinecap="round"
               strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: optionDropdown ? "" : "#96999c" }}/>
         <path d="M1.12109 1.46484L8.19216 8.53591" stroke="#737373" strokeLinecap="round"
               strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: optionDropdown ? "" : "#96999c" }}/>
      </svg>
   )
}