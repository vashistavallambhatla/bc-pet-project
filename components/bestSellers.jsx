import { Container,Box,Typography } from "@mui/material"
import Card from "../components/card.jsx"
import { homePageHeadings,homePageLeftBox } from "../src/commonStyles.js"


const BestSellers = () => {

    const bestSellers = [
        {   
            id : 1,
            img : "https://www.thirdwavecoffeeroasters.com/cdn/shop/products/1_e49e09b5-6de2-43ce-82a9-ae5a03f386e4_1200x1200.jpg?v=1672991807",
            name : "EL DIABLO",
            roast_type : "medium dark",
            profile : "Orange,Zesty and Bold"
        },
        {   
            id : 2,
            img : "https://www.thirdwavecoffeeroasters.com/cdn/shop/products/1_37109c38-db66-4c29-a5c9-370a5dc3a573_1200x1200.jpg?v=1673341767",
            name : "VIENNA ROAST",
            roast_type : "dark roast",
            profile : "Dark Chocolate, Maple Syrup, Toasted Walnut"
        },
        {   
            id : 3,
            img : "https://www.thirdwavecoffeeroasters.com/cdn/shop/files/SSOBABACOFFEEBEANFRONT_1200x1200.jpg?v=1694725258",
            name : "Speciality Single Origin Bababudangiri Region",
            roast_type : "medium light roast",
            profile : "Pineapple, Passion Fruit, Molasses"
        }
    ]
    
    return (
        <Container maxWidth={false} sx={{display : "flex",fontFamily : "Raleway",marginTop : "5rem",marginBottom : "5rem",width : "100%"}}>
            <Box sx={homePageLeftBox}>
                <Typography variant="h3" sx={homePageHeadings}>Best sellers</Typography>
                <Typography>We love what you love!
                Try out the coffees our customers liked best. From intensely bold to gently light, there’s a flavour and roast for everyone. </Typography>
            </Box>
            <Box sx={{display : "flex"}}>
                {
                    bestSellers.map((product) => (
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