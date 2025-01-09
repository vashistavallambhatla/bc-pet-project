import {atom} from 'recoil'

export const cartAtom = atom({
    key : "cartAtom",
    default : null
})

export const cartId = atom({
    key : "cartId",
    default : null
})

export const cartu = atom({
    key : "cartu",
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

export const orderItemsAtom = atom({
    key : "orderItemsAtom",
    default : null
})

export const newAddressOpen = atom({
    key : "newAddressOpen",
    default : true
})

export const newPaymentCardOpen = atom({
    key : "newPaymentCard",
    default : false
})

export const selectedAddressAtom = atom({
    key : "selectedAddressAtom",
    default : null
})

export const selectedCardAtom = atom({
    key : "selectedCardAtom",
    default : null
})
