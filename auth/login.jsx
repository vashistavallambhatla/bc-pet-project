import { Button, Container, Typography,TextField,ThemeProvider, colors} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useEffect, useState } from "react"
import { isFormValid, theme } from "./authHelpers"
import { buttonStyles,formHeadings,authSwitchBtn,authContainer, coffee} from "../src/commonStyles"
import {Link,useNavigate} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError]=useState(null)
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        const response = await supabase.auth.signInWithPassword({email : email,password : password})
        const user = response.data.user
        if(response.error){
            alert(response.error.message)
            setError(response.error)
        } else {
            navigate("/")
        }
    }

    const handleSigninWithGoogle = async() => {
        try{
            const {user,error} = await supabase.auth.signInWithOAuth({
                provider : "google",
                options : {
                    redirectTo : "http://localhost:5173/"
                }
            })
            alert("User signed in",user)
        } catch(error){
            console.log(`Error logging in with google : ${error}`)
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="auth-page" >
            <Container maxWidth={false} sx={authContainer} >
                <Typography variant="h4" sx={formHeadings}>SignIn</Typography>
                <TextField id="outlined-email" label="Email" variant="outlined" required onChange={e => setEmail(e.target.value)}/>
                <TextField id="outlined-password" label="Password" variant="outlined" required onChange={e => setPassword(e.target.value)}/>
                <Button sx={buttonStyles} onClick={handleSignIn}>SignIn</Button>
                <Typography>Don't have an account? <Link to="/signup" style={authSwitchBtn}> Register here</Link></Typography>
                <Typography><Link to="/forgotPassword" style={authSwitchBtn}>Forgot password?</Link></Typography>
                <Button sx={{display : "flex",alignItems : "center",gap : "1rem",pr : "2rem",mt : "1rem"}} >
                    <FcGoogle style={{ fontSize: '2rem' }}/>
                    <Typography sx={{color : coffee,fontWeight : "bold",top : "10%",position : "relative"}}>Sign in with google</Typography>
                </Button>
            </Container>
            </div>
        </ThemeProvider>
    )
}

export default SignIn