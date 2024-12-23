import { AppBar,IconButton,Typography,Toolbar,Box,Button} from "@mui/material"
import { navbarStyle } from "../src/commonStyles"
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LogoutIcon from '@mui/icons-material/Logout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../atoms/state/userAtom"
import supabase from "../supabase/supabaseClient"

const Navbar = () => {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const user = useRecoilValue(userState)

    const handleLogout = async() => {
        try {
            const {error} = await supabase.auth.signOut()

            if(error){
                console.log(`Erro logging out : ${error.message}`)
                throw error
            }

            setUser(null)

        } catch(error){
            console.log(`Logout failed : ${error.message}`)
            throw error
        }
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    return (
        <AppBar sx={navbarStyle}>
            <Toolbar sx={{display : "flex",justifyContent : "space-between",textTransform: 'uppercase',position: "relative",alignItems : "center"}}>
                <Box sx={{display : "flex",gap : "2rem"}}>
                    <Typography>shop</Typography>
                    <Typography>learn & do</Typography>
                </Box>
                <Box sx={{position: "relative",transform: "translateX(-25%)",alignItems : "center"}}>
                    <Typography variant="h4" sx={{fontWeight: "bold",fontFamily : "Raleway"}}>Coffee Zyada</Typography>
                </Box>
                <Box sx={{gap : "1rem"}}>
                    <IconButton onClick={handleProfile}>
                        <PersonIcon sx={{textSize:"large"}}/>
                    </IconButton>
                    { user && 
                    <IconButton onClick={()=>{
                        handleLogout();
                        navigate("/");
                    }}>
                        <LogoutIcon/>
                    </IconButton>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar