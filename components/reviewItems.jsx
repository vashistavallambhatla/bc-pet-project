import { Container,Box,Typography } from "@mui/material"

const ReviewItem = ({item}) => {
    return (
        <Container maxWidth={false} sx={{display : "flex",gap : "2rem",backgroundColor : "white",padding : "20px",justifyContent : "space-between"}}>
            <Box>
                <img src={item.products.image_url} style={{width : "100px",height : "100px"}}></img>
            </Box>
            <Box sx={{display : "flex",flexDirection : "column", justifyContent : "center",gap : "0.5rem"}}>
                <Typography variant="h7" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{item.products.name}</Typography>
                <Typography variant="h7" sx={{fontWeight : "bold"}}>Rs.{item.price}</Typography>
                <Box sx={{display : "flex",gap : "1rem"}}>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Size: {item.weight}g</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default ReviewItem