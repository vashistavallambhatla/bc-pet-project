import {createTheme}from "@mui/material"

const isFormValid = (username,password) => {
    console.log("here")
    return password.trim() && username.trim()
}

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
            marginBottom: 16, 
          },
        },
      },
    },
  })



export { isFormValid, theme}