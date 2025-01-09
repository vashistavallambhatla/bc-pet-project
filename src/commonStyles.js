import { Height, Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";

const coffee = "#6F4E37"
const grey = "#525252"
const white = "white"

const buttonStyles = {
    backgroundColor: coffee,
    color: "white",
    width: "30%",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    marginBottom : "20px"
};

const productCardBtn = {
    backgroundColor: coffee,
    color: "white",
    width: "80%",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
}

const authContainer = {
    maxWidth: "40%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    padding: "2rem 0rem",
};

const homePageHeadings = {fontSize : 48,textTransform : "uppercase",fontWeight : "bold",fontFamily : "Raleway"}

const formHeadings = {color : grey, fontSize : 80 ,fontFamily:"Raleway", marginBottom : "20px"}

const authSwitchBtn = {color : coffee, textDecoration : "none", "&:hover": {textDecoration:"underline"},fontSize:"medium"}

const navbarStyle = {backgroundColor : "white",padding : "1rem",color : grey,position : "sticky",top : "zero"}

const coffeeForEveryOneImg = {width : "400px",height : "500px",objectFit : "cover"}

const homePageLeftBox = {width : "500px",display : "flex",flexDirection : "column"}

const profilePageCards = {textTransform : "uppercase",maxWidth : "500px",alignItems : "center",borderRadius : "10px",padding : "30px 50px",backgroundColor : white,marginTop : "50px",display : "flex",flexDirection : "column",gap : "1rem"}

export {buttonStyles,formHeadings,authSwitchBtn,navbarStyle,authContainer,productCardBtn,coffeeForEveryOneImg,homePageHeadings,homePageLeftBox,white,profilePageCards,theme,coffee}

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h4: {
      fontFamily: 'Raleway, sans-serif',
    },
    h7: {
      fontFamily: 'Raleway, sans-serif',
    },
    body1: {
      fontFamily: 'Raleway, sans-serif',
    },
    body2: {
      fontFamily: 'Raleway, sans-serif',
    }
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: 'Raleway, sans-serif',
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, sans-serif',
        }
      }
    }
  }
});