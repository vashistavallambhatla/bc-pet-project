import { Container} from "@mui/material"
import Product from "../components/product"
import { useParams } from "react-router-dom"

const ProductPage = () => {

    const params = useParams()

    return (
        <Container maxWidth={false}>
            <Product/>
        </Container>
    )
}

export default ProductPage