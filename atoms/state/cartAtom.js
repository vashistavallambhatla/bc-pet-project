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

