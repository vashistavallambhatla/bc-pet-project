import { Container,Box,Typography } from "@mui/material"
import Card from "../components/card.jsx"
import { homePageHeadings,homePageLeftBox } from "../src/commonStyles.js"

const BestSellers = ({ bestsellers }) => {

    if (!bestsellers || bestsellers.length === 0) {
        return null;
    }
    
    return (
        <Container maxWidth={false} sx={{display : "flex",fontFamily : "Raleway",marginTop : "5rem",marginBottom : "5rem",p: 0, 
            width: '100%',
            maxWidth: '100vw !important',
            overflowX: 'hidden',
            justifyContent : "center"
            }}>
            <Box sx={homePageLeftBox}>
                <Typography variant="h3" sx={homePageHeadings}>Best sellers</Typography>
                <Typography>We love what you love!
                Try out the coffees our customers liked best. From intensely bold to gently light, there’s a flavour and roast for everyone. </Typography>
            </Box>
            <Box sx={{display : "flex",maxWidth : "100%"}}>
                {
                    bestsellers.map((product) => (
                        <Box key={product.id}>
                            <Card product={product}/>
                        </Box>
                    ))
                }
            </Box>
        </Container>
    )
}

export default BestSellers