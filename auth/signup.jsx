import { Button, Container, Typography,TextField,ThemeProvider} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useState } from "react"
import { isFormValid, theme } from "./authHelpers"
import { authContainer, authSwitchBtn, buttonStyles, formHeadings } from "../src/commonStyles"
import {Link,useNavigate} from "react-router-dom"

const SignUp = () => {
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [user,setUser]=useState(null)
    const [error,setError]=useState(null)
    const [signingUp,setSigningUp] = useState(false)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setSigningUp(true)
        const response = await supabase.auth.signUp({email : email,password : password})
        setSigningUp(false)
        console.log(response)
        if(response.error){
            alert(response.error)
            setError(response.error)
        } else {
            alert(`User signedUp : ${response.data}`)
            setUser(response.user)
            navigate("/")
        } 
        
    }


    return (
        <div className="auth-page">
        <ThemeProvider theme={theme}>
            <Container maxWidth={false} sx={authContainer}>
                <Typography variant="h3" sx={formHeadings}>Register</Typography>
                <TextField id="outlined-email" label="First Name" variant="outlined" required onChange={e => setFirstname(e.target.value)}/>
                <TextField id="outlined-email" label="Last Name" variant="outlined" required onChange={e => setLastname(e.target.value)}/>
                <TextField id="outlined-email" label="Email" variant="outlined" required  onChange={e => setEmail(e.target.value)}/>
                <TextField id="outlined-password" label="Password" variant="outlined" required onChange={e => handleChangePassword(e)}/>
                <Button sx={buttonStyles} onClick={handleSignup}>{signingUp ? "Signing Up..." : "Signup"}</Button>
                <Typography>Already have an account? 
                    <Link to="/profile" style={authSwitchBtn}> Login here</Link>
                </Typography>
            </Container>
        </ThemeProvider>
        </div>
    )
}

export default SignUp