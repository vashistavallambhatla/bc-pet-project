import { AppBar,IconButton,Typography,Toolbar,Box,Menu,MenuItem,TextField} from "@mui/material"
import { navbarStyle } from "../src/commonStyles"
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../atoms/state/userAtom"
import supabase from "../supabase/supabaseClient"
import { useState } from "react"

const Navbar = () => {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const user = useRecoilValue(userState)
    const [shopAnchor,setShopAnchor] = useState(null)
    const [learnAnchor,setLearnAnchor] = useState(null)
    const [search,setSearch] = useState(false)
    const [searchParam,setSearchParam] = useState("")

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

    const handleSearch = async () => {
        if(searchParam.trim()==="") setSearch(false)
        if(!search) setSearch(true)
        if(search && searchParam) navigate(`/search/${searchParam}`)
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    return (
        <AppBar sx={navbarStyle}>
            <Toolbar sx={{display : "flex",justifyContent : "space-between",textTransform: 'uppercase',position: "relative",alignItems : "center",padding : "0",margin : "0"}}>
                <Box sx={{display : "flex",gap : "2rem"}} onClick={()=>{}}>
                    <Typography id="shop-dropdown" onClick={(e) => setShopAnchor(e.currentTarget)} sx={{cursor : "pointer"}}>shop</Typography>
                    <Menu
                        id="shop-dropdown"
                        anchorEl={shopAnchor}
                        open={Boolean(shopAnchor)}
                        onClose={()=>{setShopAnchor(null)}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                       }}
                       sx={{zIndex : 7000}}
                   >
                        <MenuItem onClick={() => {
                            navigate("/collections/all")
                            setShopAnchor(null)
                        }}>All items</MenuItem>
                        <MenuItem onClick={() => {
                            navigate("/collections/beans")
                            setShopAnchor(null)
                        }}>Coffe Beans</MenuItem>
                        <MenuItem onClick={() => {
                            navigate("/collections/easy-bags")
                            setShopAnchor(null)
                        }}>Easy Coffee Bags</MenuItem>
                        <MenuItem onClick={() => {
                            navigate("/collections/cold-brew")
                            setShopAnchor(null)
                        }}>Easy Cold Brew Bags</MenuItem>
                    </Menu>
                    <Typography id="learn-and-do-dropdown" onClick={(e)=>{setLearnAnchor(e.currentTarget)}} sx={{cursor : "pointer"}} >learn & do</Typography>
                    <Menu
                        id="learn-and-do-dropdown"
                        anchorEl={learnAnchor}
                        open={Boolean(learnAnchor)}
                        onClose={()=>{setLearnAnchor(null)}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                       }}
                       sx={{zIndex : 7000}}
                   >
                        <MenuItem onClick={() => setLearnAnchor(null)}>Brewing guides</MenuItem>
                    </Menu>
                </Box>
                <Box sx={{position: "absolute",left : "50%",transform: "translateX(-50%)",alignItems : "center",cursor : "pointer"}} onClick={()=>{navigate("/")}}>
                    <Typography variant="h4" sx={{fontWeight: "bold",fontFamily : "Raleway"}}>Coffee Zyada</Typography>
                </Box>
                <Box sx={{gap : "1rem",display : "flex"}}>
                    {
                        search && 
                        <Box>
                            <TextField id="standard-basic" label="Search coffee" variant="standard" onChange={(e) => [setSearchParam(e.target.value)]}/>
                        </Box>
                    }
                    <IconButton onClick={handleSearch}>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton onClick={()=>{navigate("/cart")}}>
                        <ShoppingBagOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={handleProfile}>
                        <PersonIcon/>
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