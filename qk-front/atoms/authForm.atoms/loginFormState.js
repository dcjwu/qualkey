import { atom } from "recoil"

export const initialLoginFormState = {
   email: "",
   password: "",
   rememberMe: "false"
}

export const loginFormState = atom({
   key: "loginFormState",
   default: initialLoginFormState
})