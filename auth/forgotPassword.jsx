import { Container, TextField, Typography,Button,ThemeProvider} from "@mui/material"
import { formHeadings,buttonStyles,authSwitchBtn, authContainer, } from "../src/commonStyles"
import { theme } from "./authHelpers"
import {Link} from "react-router-dom"

const ForgotPassword = () => {
    return (
        <div className="auth-page">
            <ThemeProvider theme={theme}>
            <Container maxWidth={false} sx={authContainer}>
                <Typography variant="h4" sx={formHeadings}>Reset Password</Typography>
                <TextField id="outlined-email" label="Email" variant="outlined" required onChange={e => setEmail(e.target.value)}/>
                <Button sx={buttonStyles}>Reset</Button>
                <Typography>Already have an account? 
                    <Link to="/profile" style={authSwitchBtn}> Login here</Link>
                </Typography>
            </Container>
            </ThemeProvider>
        </div>
    )
}

export default ForgotPassword