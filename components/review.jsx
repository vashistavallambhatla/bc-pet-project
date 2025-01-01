import { Container,Box, Typography } from "@mui/material"
import { cartAtom } from "../atoms/state/cartAtom"
import { useRecoilValue } from "recoil"

const Review = () => {
    const total = useRecoilValue(cartAtom)

    return (
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 10,backgroundColor : "white",width : "700px",padding : "30px 0px"}}>
            <Box sx={{ mt: 4, mb: 4 , width : "600px"}}>
                <Box>
                    <Typography>Cart : {total}</Typography>
                    <Typography>Shipping : 99.9</Typography>
                    <Typography>Total : {total + 99.9}</Typography>
                </Box>
                <Box>
                    Shipping Address
                </Box>
            </Box>
        </Container>
    )
}

export default Review