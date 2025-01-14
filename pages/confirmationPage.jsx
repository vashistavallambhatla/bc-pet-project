import { Container,Typography ,Box } from "@mui/material"

const ConfirmationPage = () => {
    return (
        <Container>
            <Box sx={{position: "fixed",
                top: -30,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 200,
                flexDirection : "column"}}
            >
                <Typography variant="h3" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>Order</Typography>
                <img src="src/assets/confirmation.png"></img>
                <Typography variant="h3" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>Thanks for shopping with us!</Typography>
            </Box>
        </Container>
    )
}

export default ConfirmationPage