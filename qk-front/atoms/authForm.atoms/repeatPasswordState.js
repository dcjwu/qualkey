import { atom } from "recoil"

export const initialRepeatFormState = { password: "", repeatPassword: "" }

export const repeatPasswordState = atom({
   key: "repeatPasswordState",
   default: initialRepeatFormState
})