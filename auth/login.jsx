import { Button, Container, Typography,TextField,ThemeProvider, colors} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useState } from "react"
import { isFormValid, theme } from "./authHelpers"
import { buttonStyles,formHeadings } from "../src/commonStyles"

const SignIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [user,setUser]=useState(null)
    const [error,setError]=useState(null)

    const handleSignIn = async (e) => {
        e.preventDefault()
        const response = await supabase.auth.signInWithPassword({email : email,password : password})
        console.log(response)
        if(response.error){
            alert(response.error.message)
            setError(response.error)
        } else {
            alert(`User signed In : ${response.data.user.id}`)
            setUser(response.data)
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false} className="auth-container">
                <Typography variant="h4" sx={formHeadings}>SignIn</Typography>
                <TextField id="outlined-email" label="Email" variant="outlined" required onChange={e => setEmail(e.target.value)}/>
                <TextField id="outlined-password" label="Password" variant="outlined" required onChange={e => setPassword(e.target.value)}/>
                <Button sx={buttonStyles} onClick={handleSignIn}>SignIn</Button>
                <Typography>Don't have an account? <span>Register here</span></Typography>
                <Typography variant="h9" sx={{color : "blue","&:hover": {textDecoration:"underline",}}}>Forgot password?</Typography>
            </Container>
        </ThemeProvider>
    )
}

export default SignIn