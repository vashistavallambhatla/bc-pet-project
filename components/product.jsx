import {Container,Box,Typography,Button,FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import { buttonStyles } from "../src/commonStyles"
import { useState } from "react"

const Product = ({product}) => {
    const [grindSize,setGrindSize] = useState("Whole Beans")
    const [size,getSize] = useState(250)
    const [quantity,setQuantity] = useState(1)

    return (
        <Container maxWidth={false} sx={{display : "flex",fontFamily : "Raleway"}}>
            <Box sx={{width : "50%",height : "100vh",display : "flex",alignItems : "center",justifyContent : "right",paddingRight : "20px"}}>
                <img src="https://www.thirdwavecoffeeroasters.com/cdn/shop/products/4_17b8f134-9cc2-4265-9645-f884c60422ff_1200x1200.jpg?v=1672991806" style={{maxWidth : "700px"}}/>
            </Box>
                <Box sx={{maxWidth : "50%",height : "100vh",display : "flex",justifyContent : "left",paddingLeft : "20px",alignItems : "center"}}>
                    <Box sx={{width  : "70%",display : "flex",flexDirection : "column",gap : "1.5rem"}}>
                    <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{product.title}</Typography>
                    <Typography variant="h7" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{product.profile}</Typography>
                    <Typography>{product.description}</Typography>
                    <Box sx={{display : "flex",gap : "3rem"}}>
                        <Typography >{product.roast_type}</Typography>
                        <Typography>{product.category}</Typography>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Grind size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={grindSize}
                            label="grind-size"
                            onChange={(e)=>{setGrindSize(e.target.value)}}
                        >
                            <MenuItem value={"Whole Beans"}>Whole Beans</MenuItem>
                            <MenuItem value={"Coarse Grind"}>Coarse Grind</MenuItem>
                            <MenuItem value={"Medium Grind"}>Medium Grind</MenuItem>
                            <MenuItem value={"Fine Grind"}>Fine Grind</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <FormControl sx={{width : "50%"}}>
                            <InputLabel id="size-select">size</InputLabel>
                            <Select
                                labelId="size-select"
                                id="size-simple-select"
                                defaultValue={size}
                                label="packet-size"
                                onChange={(e) => {setSize(e.target.value)}}
                            >
                                <MenuItem value={250}>250</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{width : "50%"}}>
                            <InputLabel id="quantity-select">size</InputLabel>
                            <Select
                                labelId="quantity-select"
                                id="quantity-simple-select"
                                defaultValue={quantity}
                                label="quantity"
                                onChange={(e) => {setQuantity(e.target.value)}}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{display : "flex",gap : "3rem"}}>
                        <Button sx={buttonStyles}>Add to cart</Button>
                        <Button sx={buttonStyles}>Buy now</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Product