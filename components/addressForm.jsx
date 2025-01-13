import { Container, Box, Typography, Button, TextField, FormControlLabel,Checkbox } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState,useEffect } from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { addressFormAtom,newAddressAtom,newAddressOpen, saveShippingAddress, selectedAddressAtom, useShippingAtom } from "../atoms/state/cartAtom";
import { useNavigate } from "react-router-dom";
import { cartAtom } from "../atoms/state/cartAtom";
import { userState } from "../atoms/state/userAtom";
import supabase from "../supabase/supabaseClient";



const AddressForm = () => {
    const user = useRecoilValue(userState)
    const navigate = useNavigate()
    const [addressFormData,setAddressFormData] = useRecoilState(addressFormAtom)
    const cart  = useRecoilValue(cartAtom)
    const [open,setOpen] = useRecoilState(newAddressOpen)
    const [shippingAddresses,setShippingAddresses] = useState(null)
    const [selectedAddress,setSelectedAddress] = useRecoilState(selectedAddressAtom)
    const [save,setSave] = useRecoilState(saveShippingAddress)
    const [use,setUse] = useRecoilState(useShippingAtom)
    const [newAddress,setNewAddress] = useRecoilState(newAddressAtom)



    const handleChange = (e) => {
        const {name,value} = e.target;
        setNewAddress((prev) => ({...prev,[name] : value}))
    }

    const handleAddressSelection = (address) => {
    
        if (selectedAddress === address.id.toString()) {
            setSelectedAddress(null);
            setAddressFormData({}); 
            return;
        }
        
        setSelectedAddress(address.id.toString());
        setAddressFormData({
            firstName: address.first_name,
            lastName: address.last_name,
            addressLine1: address.address_line1,
            addressLine2: address.address_line2,
            city: address.city,
            state: address.state,
            zipCode: address.zip_code,
            country: address.country
        });
    };

    useEffect(()=>{
        if(!cart){
            localStorage.removeItem("activeState")
            navigate("/cart")
        }
    },[])

    useEffect(()=>{
        const sessionAddress = sessionStorage.getItem("shippingAddress")

        if(sessionAddress){
            setNewAddress(JSON.parse(sessionAddress))
            
        }

        const getShippingAddress = async ()=> {
            if(user){
                try{
                    const {data : shippingAddresses,error : shippingAddressError} = await supabase.from("shipping_address").select("*").eq("user_id",user.id)
                    if(shippingAddressError) throw new Error(`Error while fetching shippingAddresses`,shippingAddressError)
                    if(!shippingAddresses || shippingAddresses.length === 0) throw new Error(`No existing shipping addresses found`)
                    
                    setShippingAddresses(shippingAddresses)
                    console.log(shippingAddresses)
                } catch(error) {
                    console.error(error)
                }
            }
        }

        getShippingAddress()
    },[user])


    if(!cart) return null

    return (
        <Container>
        <Container maxWidth="lg" sx={{display : "flex",justifyContent : "center",flexDirection : "column",alignItems : 'center',mt : 10}}>
            {shippingAddresses && shippingAddresses.map((address) => (
                <Box 
                    key={address.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        backgroundColor: "white",
                        width: "700px",
                        padding: "20px",
                        borderRadius: '4px',
                        border: selectedAddress === address.id.toString() ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleAddressSelection(address)}
                >
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={selectedAddress === address.id.toString()}
                                onChange={() => {
                                    handleAddressSelection(address)
                                    setUse(false)
                                }}
                            />
                        }
                        label={
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle1">{address.first_name} {address.last_name}</Typography>
                                <Typography variant="body2" color="text.secondary">{address.address_line1}</Typography>
                                <Typography variant="body2" color="text.secondary">{address.address_line2}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {address.city} {address.state} {address.zip_code} {address.country}
                                </Typography>
                            </Box>
                        }
                    />
                </Box>
            ))}
            <Button sx={{display : 'flex',justifyContent : "center",mt : 5,backgroundColor : "white",width : "300px",padding : "10px 0px"}}
            onClick={()=>{
                setOpen(prev => !prev)
            }}>
                {!open ? "+ Add New Address" : "collapse"}
            </Button>
        </Container>
    
        { open &&
        <>
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 5,backgroundColor : "white",width : "700px",padding : "30px 0px"}}>
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
                            value={newAddress?.firstName || ''}
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
                            value={newAddress?.lastName || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="addressLine1" name="addressLine1" label="Address line 1" fullWidth variant="outlined" value={newAddress?.addressLine1 || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="addressLine2" name="addressLine2" label="Address line 1" fullWidth variant="outlined" value={newAddress?.addressLine2 || ''} onChange={handleChange}/>
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="outlined"
                            value={newAddress?.city || ''}
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
                            value={newAddress?.state || ''}
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
                            value={newAddress?.zipCode || ''}
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
                            value={newAddress?.country || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <Box sx={{display : "flex",width : "700px",margin : "0 auto"}}>
        <FormControlLabel
            control={
                <Checkbox
                checked={use}
                onChange={()=>{
                    setUse(prev => !prev)
                    setSelectedAddress(null)
                    if(use) setAddressFormData({})
                    else setAddressFormData(newAddress)
                }}
                />
            }
            label={<Typography>Use this address</Typography>}
            sx={{width : "100%",mt : ".5rem",pl : ".1rem"}}
        /> 
        <FormControlLabel
            control={
                <Checkbox
                checked={save}
                onChange={()=>{
                    setSave(prev => !prev)
                }}
                />
            }
            label={<Typography>Save this address for future orders</Typography>}
            sx={{width : "100%",display : "flex",justifyContent : "flex-end",mt : ".1rem"}}
        /> 
        </Box>
        </>

        }

        </Container>
    
    )
}

export default AddressForm