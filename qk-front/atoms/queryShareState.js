import { atom } from "recoil"

export const queryShareState = atom({
   key: "queryShareState",
   default: { uuid: "", password: "" }
})