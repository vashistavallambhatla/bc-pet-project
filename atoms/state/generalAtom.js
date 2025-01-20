import { atom } from "recoil";

const searchQueryAtom = atom({
    key : "searchQueryAtom",
    default : ""
})

export {searchQueryAtom}