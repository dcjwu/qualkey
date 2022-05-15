import { useRecoilState } from "recoil"

import { burgerMenuActiveState } from "../../../atoms"
import styles from "./BurgerButton.module.scss"

const BurgerButton = ({ ...otherProps }) => {
   
   const [burgerMenuActive, setBurgerMenuActive] = useRecoilState(burgerMenuActiveState)
   
   const handleBurgerMenuActive = ()  => {
      setBurgerMenuActive(prevState => !prevState)
   }
   
   return (
      <div {...otherProps} className={`${styles.icon} ${burgerMenuActive ? styles.active : ""}`} onClick={handleBurgerMenuActive}>
         <span/>
         <span/>
         <span/>
      </div>
   )
}

export default BurgerButton