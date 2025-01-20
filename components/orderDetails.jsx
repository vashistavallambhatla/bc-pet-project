import { Container, Box, Typography } from "@mui/material"
import VerticalStaticStepper from "./verticalSteps"
import OrderItem from "./orderItems"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { orderBoxStyle } from "../src/commonStyles"
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetails = ({ orderProp }) => {
    const [address, setAddress] = useState({});
    const [currentStep, setCurrentStep] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const initializeOrder = () => {
            try {
                const orderData = orderProp || location.state?.data;
                
                if (!orderData) {
                    navigate("/profile");
                    return;
                }

                setOrder(orderData);
            
                const shippingAddress = typeof orderData.shipping_address === 'string' 
                    ? JSON.parse(orderData.shipping_address)
                    : orderData.shipping_address;
                    
                setAddress(shippingAddress);

                const deliveryStepMap = {
                    'placed': 0,
                    'dispatched': 1,
                    'transit': 2,
                    'delivered': 3
                };

                setCurrentStep(deliveryStepMap[orderData.delivery_status] ?? -1);
            } catch (error) {
                console.error('Error initializing order:', error);
                navigate("/profile");
            } finally {
                setLoading(false);
            }
        };

        initializeOrder();
    }, [orderProp, location.state, navigate]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <ClipLoader />
            </div>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <Container sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem",
            width: "800px",
            mb: "3rem",
            mt: "5rem"
        }}>
            <Typography 
                variant="h4" 
                sx={{
                    fontWeight: "bold",
                    fontFamily: "Raleway",
                    textTransform: "uppercase"
                }}
            >
                Order Details
            </Typography>

            <Box key={order.order_id} sx={orderBoxStyle}>
                {order.order_items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant="h9" sx={{ fontWeight: "bold" }}>
                    Shipping Address
                </Typography>
                
                {address && (
                    <Box width="80%">
                        <Typography variant="h9">
                            {address.firstName} {address.lastName}
                        </Typography>
                        <Typography variant="h9">
                            {address.addressLine1} {address.addressLine2}
                        </Typography>
                        <Typography variant="h9">
                            {address.city} {address.state}
                        </Typography>
                        <Typography variant="h9">
                            {address.zipCode} {address.country}
                        </Typography>
                    </Box>
                )}
            </Box>

            {currentStep !== -1 && (
                <VerticalStaticStepper currentStep={currentStep} />
            )}
        </Container>
    );
};

export default OrderDetails;