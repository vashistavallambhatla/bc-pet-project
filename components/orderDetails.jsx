import { Container,Box,Typography} from "@mui/material"
import VerticalStaticStepper from "./verticalSteps"
import OrderItem from "./orderItems"
import { useEffect,useState } from "react"
import { ClipLoader } from "react-spinners"
import { orderBoxStyle } from "../src/commonStyles"
import { useLocation, useNavigate } from 'react-router-dom';


const OrderDetails = () => {
    const [address,setAddress] = useState({})
    const [currentStep,setCurrentStep] = useState(-1)
    const [loading,setLoading] = useState(true)
    const location = useLocation();
    const order = location.state?.data;
    const navigate = useNavigate()

    useEffect(()=>{
        if(!order) {
            navigate("/profile")
            return
        }

        setAddress(JSON.parse(order.shipping_address))
        switch(order.delivery_status){
            case "placed":
                setCurrentStep(0)
                break
            case "dispatched":
                setCurrentStep(1)
                break
            case "transit":
                setCurrentStep(2)
                break;
            case "delivered":
                setCurrentStep(3)
                break
            default: 
                setCurrentStep(-1)
        }
        setLoading(false)
    },[])

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }

    return (
        <Container sx={{backgroundColor : "white",display : "flex",flexDirection : "column",alignItems : "center",gap : "2rem",padding : "2rem",width : "800px",mb : "3rem",mt : "5rem"}}>
            <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway",textTransform : "uppercase"}}>Order Details</Typography>
            <Box key={order.order_id} sx={orderBoxStyle}>
                {order.order_items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </Box>
            <Box sx={{display : "flex",flexDirection : "column",alignItems : "center"}}>
                <Typography variant="h9" sx={{fontWeight : "bold"}}>Shipping Address</Typography>
                <Box width="80%">
                    <Typography variant="h9">{address?.firstName} {address?.lastName} </Typography>
                    <Typography variant="h9">{address?.addressLine1} {address?.addressLine2} </Typography>
                    <Typography variant="h9">{address?.city} {address?.state} </Typography>
                    <Typography variant="h9">{address?.zipCode} {address?.country}</Typography>
                </Box>
            </Box>
            {
                currentStep!==-1 &&
                <VerticalStaticStepper currentStep={currentStep}/>
            }
        </Container>
    )
}

export default OrderDetails