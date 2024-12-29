import { Container, Typography , Box} from "@mui/material"
import BestSellers from "../components/bestSellers"
import CoffeeForEveryOne from "../components/coffeeForEveryone"


const HomePage = () => {

    return (
        <Container maxWidth={false} >
            <BestSellers/>
            <CoffeeForEveryOne/>
        </Container>
    )
}

export default HomePage