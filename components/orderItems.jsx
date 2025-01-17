import { Container,Box, Typography } from "@mui/material"


const OrderItem = ({item}) => {

    return (
        <Container maxWidth={false} sx={{display : "flex",gap : "2rem",backgroundColor : "white",padding : "20px",backgroundColor : "white"}}>
            <Box>
                <img src={item.products.image_url} style={{width : "130px",height : "130px"}}></img>
            </Box>
            <Box sx={{display : "flex",flexDirection : "column", justifyContent : "center",gap : "0.5rem",width : "100%"}}>
                <Typography variant="h7" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{item.products.name}</Typography>
                <Typography variant="h7" sx={{fontWeight : "bold"}}>Rs.{item.price}</Typography>
                <Box sx={{display : "flex",gap : "1rem",width : "100%",justifyContent : "center"}} >
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Size: {item.weight}g</Typography>
                </Box>
                <Typography>{item.grind_size}</Typography>
            </Box>
        </Container>
    )
}

export default OrderItem