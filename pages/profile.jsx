import { useRecoilValue, useRecoilState } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"
import { Container, Typography, Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import supabase from "../supabase/supabaseClient"
import { white, profilePageCards, buttonStyles } from "../src/commonStyles"
import OrderItem from "../components/orderItems"
import { ClipLoader } from "react-spinners"
import { orderItemsAtom } from "../atoms/state/cartAtom"
import { userDetailsAtom } from "../atoms/state/userAtom"
import { coffee,orderBoxStyle } from "../src/commonStyles"
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom"
import OrderDetails from "../components/orderDetails"

const buttonStyle = {
    backgroundColor: coffee,
    color: "white",
    width: "70%",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    marginBottom: "20px",
    padding: "10px 40px"
}

const Profile = () => {
    const navigate = useNavigate()
    const user = useRecoilValue(userState)
    const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom)
    const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom)
    const [loading, setLoading] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(false)
    const [showPreviousOrders, setShowPreviousOrders] = useState(false)

    const handleChange = (e) => {
        setUserDetails((prev) => ({...prev,[e.target.name] : e.target.value}))
    }

    const handleUpdate = async () => {
        try{
            const { error } = await supabase.from("users").update(userDetails).eq("id",user.id)
            if(error) throw new Error(`Error updating user details`,error.message)
            console.log('Fields updated successfully')
        } catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        if(user){
            const fetchData = async () => {
                setLoading(true)
                try {
                    const [userResponse, ordersResponse] = await Promise.all([
                        supabase
                            .from('users')
                            .select('*')
                            .eq('id', user.id)
                            .single(),
                        supabase
                            .from("orders")
                            .select(`
                                *,
                                order_items(
                                    quantity,
                                    price,
                                    weight,
                                    grind_size,
                                    products(name, image_url, price)
                                )
                            `)
                            .eq("user_id", user.id) 
                    ]);

                    if (userResponse.error) throw new Error(`Error fetching user: ${userResponse.error.message}`);
                    if (ordersResponse.error) throw new Error(`Error fetching orders: ${ordersResponse.error.message}`);

                    setUserDetails(userResponse.data);
                    setOrderItems(ordersResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
        };
        fetchData();
        } else {
            setLoading(false)
        }
    }, [user]);

    const renderOrders = () => {
        if (!orderItems || orderItems.length === 0) {
            return <Typography>You have no orders yet</Typography>
        }

        return orderItems.map((order) => (
            <Box key={order.order_id} sx={orderBoxStyle} onClick={()=>{navigate('/orderDetails',{state : {data : order}})}}>
                {order.order_items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}
                <Typography sx={{fontWeight : "bold",transform : "translateX(5%)",mt : "1rem"}}>Total : rs.{order.total_amount}</Typography>
            </Box>
        ))
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ClipLoader />
            </div>
        )
    }

    if (!user) return <SignIn />

    return (
        <Container maxWidth={false} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
            {!updateAddress && (
                <Box sx={profilePageCards}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Profile</Typography>
                    <img src="src/assets/profile.png" style={{borderRadius: "100%"}} alt="Profile" />
                    <Typography>{userDetails?.first_name + " " + userDetails?.last_name}</Typography>
                    <Typography>{userDetails?.email}</Typography>
                    <Typography>contact no: {userDetails?.phone_number}</Typography>
                    <Typography>Address: {userDetails?.address ? userDetails?.address : "No address"}</Typography>
                    <Typography>Date of birth: {userDetails?.dob}</Typography>
                    <Button 
                        sx={buttonStyle}
                        onClick={() => setUpdateAddress(true)}
                    >
                        Update profile
                    </Button>
                </Box>
            )}
            
            {updateAddress && (
                <Box sx={profilePageCards}>
                    <Grid container spacing={3}>
                        <Grid item size={6}>
                            <TextField label="First Name" name="first_name" defaultValue={userDetails?.first_name} onChange={handleChange}/>
                        </Grid>
                        <Grid item size={6}>
                            <TextField label="Last Name" name="last_name" value={userDetails?.last_name} onChange={handleChange}/>
                        </Grid>
                        <Grid item size={12}>
                            <TextField fullWidth label="Email" name="email" value={userDetails?.email} onChange={handleChange}/>
                        </Grid>
                        <Grid item size={12}>
                            <TextField fullWidth label="Address" name="address" value={userDetails?.address} onChange={handleChange}/>
                        </Grid>
                        <Grid item size={6}>
                            <TextField label="Contact number" name="phone_number" value={userDetails?.phone_number} onChange={handleChange}/>
                        </Grid>
                        <Grid item size={6}>
                            <TextField label="Date of birth" name="dob" value={userDetails?.dob} onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <Button 
                        sx={buttonStyle}
                        onClick={() => {
                            handleUpdate()
                            setUpdateAddress(false)
                        }}
                    >
                        Update
                    </Button>
                </Box>
            )}
            
            {!showPreviousOrders && (
                <Button sx={buttonStyles} onClick={() => setShowPreviousOrders(true)}>
                    Previous Orders
                </Button>
            )}
            
            {showPreviousOrders && (
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center",gap : "1rem" }}>
                    {renderOrders()}
                    <Button sx={buttonStyles} onClick={() => setShowPreviousOrders(false)}>
                        Hide Orders
                    </Button>
                </Box>
            )}
        </Container>
    )
}

export default Profile