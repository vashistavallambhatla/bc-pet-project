import { Container,Box, Typography } from "@mui/material"
import { addressFormAtom, cartAtom, paymentFormAtom, totalAtom } from "../atoms/state/cartAtom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import ReviewItem from "./reviewItems"
import { useEffect, useState } from "react"

const Review = () => {
    const cart = useRecoilValue(cartAtom)
    const paymentDetails = useRecoilValue(paymentFormAtom)
    const address = useRecoilValue(addressFormAtom)

    const navigate = useNavigate()

    useEffect(()=>{
        if(!cart){
            localStorage.removeItem("activeState")
            navigate("/cart")
        }
    },[])

    if (!cart || !paymentDetails || !address) {
        return null;
    }

    const totalPrice = cart.reduce((total, cartItem) => {
        const price = cartItem.price;
        const quantity = cartItem.quantity;
        return total + price
    }, 0); 

    return (
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 10,backgroundColor : "white",width : "700px",padding : "30px 0px",}}>
            <Box sx={{ mt: 4, mb: 4 , width : "600px",display : "flex",flexDirection : "column",gap : "2rem"}}>
                <Box>
                    <Typography variant="h9" sx={{fontWeight : "bold"}}>Order Items</Typography>
                    <Box sx={{display : "flex",flexDirection : "column",boxSizing : "border-box"}}>
                        {
                           Array.isArray(cart) && cart.map(cartItem => (
                                <Box key={cartItem.id} sx={{width : "100px"}}>
                                    <ReviewItem item={cartItem}/>
                                </Box>
                            ))
                        }
                    </Box>
                    <Typography variant="h9" sx={{fontWeight : "bold"}}>Total: Rs.{totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box>
                    <Typography variant="h9" sx={{fontWeight : "bold"}}>Shipping Address</Typography>
                    <Box>
                    <Typography variant="h9">{address?.firstName} {address?.lastName} </Typography>
                        <Typography variant="h9">{address?.addressLine1} {address?.addressLine2} </Typography>
                        <Typography variant="h9">{address?.city} {address?.state} </Typography>
                        <Typography variant="h9">{address?.zipCode} {address?.country}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h9" sx={{fontWeight : "bold"}}>Billing address</Typography>
                    <Box sx={{display : "flex",flexDirection : "column"}}>
                        <Typography variant="h9">Card number : {paymentDetails?.cardNumber} </Typography>
                        <Typography variant="h9">Name : {paymentDetails?.name} </Typography>
                        <Typography variant="h9">Expiration Date : {paymentDetails?.expirationDate}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Review