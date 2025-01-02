import { Container,Box,TextField } from "@mui/material"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Grid2';
import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtom, paymentFormAtom } from "../atoms/state/cartAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentForm = () => {
    const [paymentForm,setPaymentForm] = useRecoilState(paymentFormAtom)
    const cart = useRecoilValue(cartAtom)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPaymentForm((prev) => ({...prev,[name] : value}))
    }

    useEffect(()=>{
        if(!cart){
            localStorage.removeItem("activeState")
            navigate("/cart")
        }
    },[])

    if (!cart) {
        return null;
    }

    return (
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 10,backgroundColor : "white",width : "700px",padding : "30px 0px"}}>
            <Box sx={{ mt: 4, mb: 4 , width : "600px"}}>
                <CreditCardIcon sx={{fontSize : 60,mb : 2}}></CreditCardIcon>
                <Grid container spacing={3}>
                    <Grid item size={8}>
                    <TextField
                            required
                            id="cardNumber"
                            name="cardNumber"
                            label="Card number"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.cardNumber || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={4}>
                    <TextField
                            required
                            id="cvv"
                            name="cvv"
                            label="CVV"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.cvv || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                    <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.name || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                    <TextField
                            required
                            id="expirationDate"
                            name="expirationDate"
                            label="Expiration date"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.expirationDate || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default PaymentForm