import { Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";

const coffee = "#6F4E37"
const grey = "#525252"

const buttonStyles = {
    backgroundColor: coffee,
    color: "white",
    width: "30%",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    marginBottom : "20px"
};

const authContainer = {
    maxWidth: "40%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    padding: "2rem 0rem",
};
  

const formHeadings = {color : grey, fontSize : 80 ,fontFamily:"Raleway", marginBottom : "20px"}

const authSwitchBtn = {color : coffee, textDecoration : "none", "&:hover": {textDecoration:"underline"},fontSize:"medium"}

const navbarStyle = {backgroundColor : "white",padding : "1rem",color : grey,position : "sticky",top : "zero"}

export {buttonStyles,formHeadings,authSwitchBtn,navbarStyle,authContainer}