import {Container,Box,Typography,Button,FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import { buttonStyles } from "../src/commonStyles"
import { useState } from "react"

const Product = ({product}) => {
    const [grindSize,setGrindSize] = useState("Whole Beans")

    return (
        <Container maxWidth={false} sx={{display : "flex"}}>
            <Box sx={{width : "50%",height : "100vh",display : "flex",alignItems : "center",justifyContent : "right",paddingRight : "20px"}}>
                <img src="https://www.thirdwavecoffeeroasters.com/cdn/shop/products/4_17b8f134-9cc2-4265-9645-f884c60422ff_1200x1200.jpg?v=1672991806" style={{maxWidth : "700px"}}/>
            </Box>
            <Box sx={{width : "50%",height : "100vh",display : "flex",justifyContent : "left",paddingLeft : "20px",padding : "70px"}}>
                <Box sx={{width  : "100%"}}>
                    <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{product.title}</Typography>
                    <Typography variant="h7" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{product.profile}</Typography>
                    <Typography>{product.description}</Typography>
                    <Box sx={{display : "flex"}}>
                        <Typography>{product.roast_type}</Typography>
                        <Typography>{product.category}</Typography>
                    </Box>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grind size</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={grindSize}
    label="grind-size"
    onChange={()=>{}}
  >
    <MenuItem value={10}>Coarse Grind</MenuItem>
    <MenuItem value={20}>Medium Grind</MenuItem>
    <MenuItem value={30}>Fine Grind</MenuItem>
  </Select>
</FormControl>
                    <Button sx={buttonStyles}>Add to cart</Button>
                    <Button sx={buttonStyles}>Buy now</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Product