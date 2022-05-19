import { atom } from "recoil"

export const initialRepeatFormState = { password: "", passwordRepeat: "" }

export const repeatPasswordState = atom({
   key: "repeatPasswordState",
   default: initialRepeatFormState
})