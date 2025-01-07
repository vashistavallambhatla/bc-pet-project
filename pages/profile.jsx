import { useRecoilValue,useRecoilState } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"
import { Container, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import supabase from "../supabase/supabaseClient"
import { white, profilePageCards } from "../src/commonStyles"
import OrderItem from "../components/orderItems"
import { ClipLoader } from "react-spinners"
import { orderItemsAtom } from "../atoms/state/cartAtom"
import { userDetailsAtom } from "../atoms/state/userAtom"

const Profile = () => {
    const user = useRecoilValue(userState)
    const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom)
    const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (user && (!userDetails || !orderItems)) {
                setLoading(true)
                try {
                    console.log("here")
                    const [userResponse, ordersResponse] = await Promise.all([
                        
                        !userDetails ? supabase
                            .from('users')
                            .select('*')
                            .eq('id', user.id)
                            .single() : Promise.resolve({ data: userDetails }),
            
                        !orderItems ? supabase
                            .from("orders")
                            .select(`
                                *,
                                order_items(
                                    quantity,
                                    products(name, image_url, price)
                                )
                            `)
                            .eq("user_id", user.id) : Promise.resolve({ data: orderItems })
                    ]);

                    if (userResponse.error) throw new Error(`Error fetching user: ${userResponse.error.message}`);
                    if (ordersResponse.error) throw new Error(`Error fetching orders: ${ordersResponse.error.message}`);

                    if (!userDetails) setUserDetails(userResponse.data);
                    if (!orderItems) setOrderItems(ordersResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [user, userDetails, orderItems, setUserDetails, setOrderItems]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ClipLoader />
            </div>
        );
    }

    if (!user) return <SignIn />

    return (
        <Container maxWidth={false} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
            <Box sx={profilePageCards}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Profile</Typography>
                <Typography>{userDetails?.first_name + " " + userDetails?.last_name}</Typography>
            </Box>
            <Box sx={profilePageCards}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Orders</Typography>
                {!orderItems && <Typography>You have no orders yet</Typography>}
                {orderItems && orderItems.length > 0 && (
                    <Box sx={{textTransform: "uppercase",maxWidth: "500px",textAlign: "center",borderRadius: "10px",padding: "10px",backgroundColor: white,boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",marginTop: "10px"
                    }}>
                        {orderItems.map((orderItem) => (
                            <Box key={orderItem.order_id}>
                                {orderItem.order_items.map((item) => (
                                    <OrderItem key={item.id} item={item} />
                                ))}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default Profile