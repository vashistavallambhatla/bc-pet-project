import { useRecoilValue } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"
import { Container, Typography,Box } from "@mui/material"
import { useEffect,useState } from "react"
import supabase from "../supabase/supabaseClient"
import { white,profilePageCards } from "../src/commonStyles"
import OrderItem from "../components/orderItems"



const Profile = () => {
    const user = useRecoilValue(userState)
    const [userDetails,setUserDetails] = useState(null)
    const [loading,setLoading] = useState(false)
    const [orderItems,setOrderItems] = useState(null)
    const [shippingAddress,setShippingAddress] = useState(null)

    useEffect(()=>{
        if(user){
            const fetchUserDetails = async() => {
                setLoading(true)
                const { data : userData, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();
                if (error) {
                    console.error('Error fetching user by email:', error.message);
                } else {
                    console.log('User found:', userData);
                    setUserDetails(userData)
                }

            }
            
            const fetchOrders = async() => {
                try {
                    const {data : orders,error : ordersError} = await supabase.from("orders").select("*").eq("user_id",user.id)
                    if(ordersError) throw new Error(`Error while fetching previous orders`,ordersError)

                    const ordersWithItems = await Promise.all(
                        orders.map(async(order) => {
                            const {data : orderItemsWithProducts,error : orderItemsError} = await supabase.from("order_items").select("quantity,products(name,image_url,price)").eq("order_id",order.order_id)

                            if(orderItemsError) throw new Error(`Error while fetching orderItems`,orderItemsError)
                            
                            return {
                                ...order,
                                orderItemsWithProducts
                            }
                        })
                    )
                    if(!ordersWithItems || ordersWithItems.length===0) throw new Error('No orders with items')
                    setOrderItems(ordersWithItems)
                } catch (error){
                    throw new Error(error)
                }

                setLoading(false)
            }

            fetchUserDetails()
            fetchOrders()
        }
    },[user])
    
    if(!user) return <SignIn/>
    if(loading) return (<div>Loading....</div>)
    
    return (
        <Container maxWidth={false} sx={{width : "100%", display: "flex", flexDirection: "column", alignItems: "center",gap : "3rem"}}>
            <Box sx={profilePageCards}>
                <Typography variant="h6" sx={{fontWeight : "bold"}}>Profile</Typography>
                <Typography>{userDetails?.first_name+" "+userDetails?.last_name}</Typography>
            </Box>
            <Box sx={profilePageCards}>
                <Typography variant="h6" sx={{fontWeight : "bold"}}>Orders</Typography>
                {
                    !orderItems &&
                    <Typography>You have no orders yet</Typography>
                }
                {
                    orderItems && 
                    <Box sx={{textTransform : "uppercase",maxWidth : "500px",textAlign : "center",borderRadius : "10px",padding : "10px",backgroundColor : white,boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",marginTop : "10px"}}>
                    {
                        orderItems && orderItems.map((orderItem) => (
                            <Box key={orderItem.order_id}>
                                {
                                    orderItem.orderItemsWithProducts.length > 0 &&
                                    orderItem.orderItemsWithProducts.map((item) => (
                                        <OrderItem item={item}/>
                                    ))
                                }                
                            </Box>
                        ))
                    }
                    </Box>
                }
            </Box>
        </Container>
    )
}

export default Profile