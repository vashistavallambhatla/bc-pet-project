import { Container,Typography ,Box } from "@mui/material"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import OrderDetails from "../components/orderDetails"
import { ClipLoader } from "react-spinners"
import supabase from "../supabase/supabaseClient"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationPage = () => {
    const { orderId } = useParams()
    const [loading,setLoading] = useState(true)
    const [order,setOrder] = useState(null)

    useEffect(()=>{
        const getOrder = async() => {
            try{
                const {data,error} = await supabase.from("orders").select(`
                    *,order_items(quantity,price,weight,grind_size,products(name, image_url, price))`).eq("order_id",orderId).single()
                
                if(error) throw new Error(`Error while fetching the order`,error.message)
                setOrder(data)
            } catch(error){
                console.error(error)
            } finally{
                setLoading(false)
            }
        }
        getOrder()
    },[])

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }

    return (
        <Container>
            <Box sx={{display : "flex",flexDirection : "column",alignItems : "center",mt : "3rem"}}>
                <Typography variant="h3" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>Order Confirmed</Typography>
                <CheckCircleIcon sx={{ color: 'green', fontSize: 100 }}/>
                <Typography variant="h3" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>Thanks for shopping with us!</Typography>
            </Box>
            <OrderDetails orderProp={order}/>
        </Container>
    )
}

export default ConfirmationPage