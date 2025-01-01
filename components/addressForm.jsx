import { Container, Box, Typography, Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';

const AddressForm = () => {
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
                        />
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="address-line-1" name="address-line-1" label="Address line 1" fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item size={12}>
                        <TextField required id="address-line-1" name="address-line-1" label="Address line 1" fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item size={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="outlined"
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
                        />
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
}

export default AddressForm