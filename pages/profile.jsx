import { useRecoilValue } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"
import { Container, Typography,Box } from "@mui/material"
import { useEffect,useState } from "react"
import supabase from "../supabase/supabaseClient"
import { white,profilePageCards } from "../src/commonStyles"



const Profile = () => {
    const user = useRecoilValue(userState)
    const [userDetails,setUserDetails] = useState(null)
    const [loading,setLoading] = useState(false)

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
                setLoading(false)
            }

            fetchUserDetails()
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
                <Typography>You have no orders yet</Typography>
            </Box>
        </Container>
    )
}

export default Profile