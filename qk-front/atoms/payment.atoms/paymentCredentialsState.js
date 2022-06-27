import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const paymentCredentialsState = atom({
   key: "paymentCredentialsState",
   default: {},
   effects_UNSTABLE: [persistAtom]
})