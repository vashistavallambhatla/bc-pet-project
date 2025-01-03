import { Container, Box, Typography, Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState,useEffect } from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { addressFormAtom } from "../atoms/state/cartAtom";
import { useNavigate } from "react-router-dom";
import { cartAtom } from "../atoms/state/cartAtom";



const AddressForm = () => {
    const [addressFormData,setAddressFormData] = useRecoilState(addressFormAtom)
    const cart  = useRecoilValue(cartAtom)

    const handleChange = (e) => {
        const {name,value} = e.target;
        setAddressFormData((prev) => ({...prev,[name] : value}))
    }

    useEffect(()=>{
        if(!cart){
            localStorage.removeItem("activeState")
            navigate("/cart")
        }
    },[])

    if(!cart) return null

    return (
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 10,backgroundColor : "white",width : "700px",padding : "30px 0px"}}>
            <Box sx={{ mt: 4, mb: 4 , width : "600px"}}>
                <Typography variant="h4" gutterBottom>
                    Shipping Address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.firstName || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.lastName || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="addressLine1" name="addressLine1" label="Address line 1" fullWidth variant="outlined" value={addressFormData.addressLine1 || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="addressLine2" name="addressLine2" label="Address line 1" fullWidth variant="outlined" value={addressFormData.addressLine2 || ''} onChange={handleChange}/>
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.city || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="State"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.state || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="zipCode"
                            name="zipCode"
                            label="Zip/Postal code"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.zipCode || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            variant="outlined"
                            value={addressFormData.country || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default AddressForm