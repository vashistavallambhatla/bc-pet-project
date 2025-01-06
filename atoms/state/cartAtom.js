import {atom} from 'recoil'

export const cartAtom = atom({
    key : "cartAtom",
    default : null
})

export const paymentFormAtom = atom({
    key : "paymentForm",
    default : {}
})

export const addressFormAtom = atom({
    key : "addressForm",
    default : {}
})

export const totalAtom = atom({
    key : "totalAtom",
    default : null
})

export const deleteAtom = atom({
    key : "deleteAtom",
    default : false
})

