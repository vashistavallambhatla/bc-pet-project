import { Container, Typography,Box,Button } from "@mui/material"
import { productCardBtn } from "../src/commonStyles"
import { useNavigate } from "react-router-dom"

const Card = ({product}) => {

    const navigate = useNavigate()

    return (
        <Container maxWidth={false}>
            <Box sx={{display : "flex",flexDirection : "column",gap : "1rem"}} onClick={()=>{ navigate(`/product/${product.id}`)}}>
                <Box>
                    <img src={product.image_url} style={{width : "400px",height : "400px",objectFit : "cover"}}></img>
                </Box>
                <Box>
                  <Typography sx={{fontWeight : "bold"}}>{product.name}</Typography>
                  <Typography>{product.roast_type}</Typography>
                  <Typography>{product.profile}</Typography>
                </Box>
                <Button sx={productCardBtn}>VIEW PRODUCT rs {product.price}</Button>
            </Box>
        </Container>
    )
}

export default Card