import { Container, Typography,Box,Button } from "@mui/material"
import { productCardBtn } from "../src/commonStyles"
import { useNavigate } from "react-router-dom"

const Card = ({product}) => {

    const navigate = useNavigate() 

    return (
        <Container>
            <Box sx={{display : "flex",flexDirection : "column",gap : "1rem"}}>
                <img src={product.img} style={{width : "400px"}}></img>
                <Box>
                  <Typography sx={{fontWeight : "bold"}}>{product.name}</Typography>
                  <Typography>{product.roast_type}</Typography>
                  <Typography>{product.profile}</Typography>
                </Box>
                <Button sx={productCardBtn} onClick={() => {navigate("/product")}}>VIEW PRODUCT rs 540</Button>
            </Box>
        </Container>
    )
}

export default Card