import { Button, Container, Typography,TextField,ThemeProvider, colors} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useEffect, useState } from "react"
import { isFormValid, theme } from "./authHelpers"
import { buttonStyles,formHeadings,authSwitchBtn,authContainer} from "../src/commonStyles"
import {Link,useNavigate} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

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
            alert(`User signed In : ${user.id}`)
            navigate("/")
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
            </Container>
            </div>
        </ThemeProvider>
    )
}

export default SignIn