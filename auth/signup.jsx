import { Button, Container, Typography, TextField, ThemeProvider } from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useState } from "react"
import { isFormValid, theme } from "./authHelpers"
import { authContainer, authSwitchBtn, buttonStyles, formHeadings } from "../src/commonStyles"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
 
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password || !formData.firstname || !formData.lastname) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstname,
            last_name: formData.lastname
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id : data.user.id,
            first_name: formData.firstname,
            last_name: formData.lastname,
            email: formData.email
          }
        ]);

      if (profileError) throw profileError;

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <ThemeProvider theme={theme}>
        <Container maxWidth={false} sx={authContainer}>
          <form onSubmit={handleSignup} noValidate>
            <Typography variant="h3" sx={formHeadings}>
              Register
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              required
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              required
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={buttonStyles}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?
              <Link to="/login" style={authSwitchBtn}> Login here</Link>
            </Typography>
          </form>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;