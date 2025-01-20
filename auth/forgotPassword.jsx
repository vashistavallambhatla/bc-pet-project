import { useState } from 'react';
import { Container, TextField, Typography, Button, ThemeProvider } from "@mui/material";
import { formHeadings, buttonStyles, authSwitchBtn, authContainer } from "../src/commonStyles";
import { theme } from "./authHelpers";
import { Link } from "react-router-dom";
import supabase from "../supabase/supabaseClient"; 

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); 

    const handleResetPassword = async () => {
        if (!email) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage(""); 

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email,{
                redirectTo : "localhost:5173/update-password"
            });

            if (error) {
                throw error;
            }

            setMessage("Password reset link sent to your email.");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <ThemeProvider theme={theme}>
                <Container maxWidth={false} sx={authContainer}>
                    <Typography variant="h4" sx={formHeadings}>Reset Password</Typography>
                    
                    <TextField
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    <Button
                        sx={buttonStyles}
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Reset"}
                    </Button>
                    
                    {message && (
                        <Typography sx={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
                            {message}
                        </Typography>
                    )}

                    <Typography>
                        Already have an account? 
                        <Link to="/profile" style={authSwitchBtn}> Login here</Link>
                    </Typography>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default ForgotPassword;
