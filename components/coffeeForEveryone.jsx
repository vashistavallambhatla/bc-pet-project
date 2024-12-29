import {Container,Box,Typography} from '@mui/material'
import { coffeeForEveryOneImg,homePageHeadings,homePageLeftBox } from '../src/commonStyles'

const CoffeeForEveryOne = () => {
    const title = {fontWeight : "bold",textTransform : "uppercase"}
    return (
        <Container maxWidth={false} sx={{marginBottom : "10rem",width: '100%',padding : 0,
            maxWidth: '100vw !important',
            overflowX: 'hidden'}}>
            <Box sx={{display : "flex",gap : "2em"}}>
            <Box sx={homePageLeftBox                        }>
                <Typography sx={homePageHeadings}>COFFEE FOR EVERYONE</Typography>
                <Typography>Whether you just started your coffee journey or you’re a seasoned coffee-lover, there’s something for everyone to sip on.</Typography>
            </Box>
                <Box sx={{display : "flex",flexDirection : "column",gap : "4rem"}}>
                    <Box>
                        <img src="https://www.thirdwavecoffeeroasters.com/cdn/shop/files/photo-1559496417-e7f25cb247f3_4_314x195.jpg?v=1642007480"/>
                        <Typography sx={title}>single origin</Typography>
                        <Typography>Selectively sourced</Typography>
                    </Box>
                    <Box>
                        <img src="https://www.thirdwavecoffeeroasters.com/cdn/shop/files/photo-1559496417-e7f25cb247f3_6_314x195.jpg?v=1642007481"/>
                        <Typography sx={title}>special blends</Typography>
                        <Typography>Carefully crafted</Typography>
                    </Box>
                </Box>
                <Box>
                    <img src="https://cdn.shopify.com/s/files/1/1834/9395/files/Third_Wave13496.jpg" style={coffeeForEveryOneImg}/>
                    <Typography sx={title}>easy coffee bags</Typography>
                    <Typography>No equipment needed</Typography>
                </Box>
                <Box>
                    <img src="https://cdn.shopify.com/s/files/1/1834/9395/files/Easy_Coffee_Bags_Vienna_Roast_pure_bd5f4f60-4b76-4610-be8e-b44a10df0876.jpg" style={coffeeForEveryOneImg}/>
                    <Typography sx={title}>Easy cold brew</Typography>
                    <Typography>No equipment needed</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default CoffeeForEveryOne