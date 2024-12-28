import { Container,Typography } from "@mui/material"
import Product from "../components/product"

const ProductPage = () => {

    const product = {
        image : "https://www.thirdwavecoffeeroasters.com/cdn/shop/products/4_17b8f134-9cc2-4265-9645-f884c60422ff_1200x1200.jpg?v=1672991806",
        title : "EL DIABLO",
        description : `Our house blend might just remind you of dessert, and we’re perfectly okay with that. With bold notes of zesty orange, rich chocolate, and sweet brown sugar, this coffee is big-bodied, well-structured, and deeply complex. It’s what keeps our team at Third Wave Coffee going strong. Potent and flavorful on its own, or decadently indulgent with milk or cream, every sip is a delightful experience.`,
        profile : "Orange, Chocolate, Brown Sugar",
        roast_type : "Medium Dark Roast",
        category : "100% Arabica Coffee"
    }

    return (
        <Container maxWidth={false}>
            <Product product={product}/>
        </Container>
    )
}

export default ProductPage