import { atom } from "recoil"

export const initialForgotFormState = { email: "" }

export const forgotFormState = atom({
   key: "forgotFormState",
   default: initialForgotFormState
})