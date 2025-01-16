import {Container,Box,Typography,Button,FormControl,InputLabel,Select,MenuItem, Alert} from "@mui/material"
import { buttonStyles, coffee } from "../src/commonStyles"
import { useEffect, useRef, useState } from "react"
import { userState } from "../atoms/state/userAtom"
import { useRecoilValue } from "recoil"
import supabase from "../supabase/supabaseClient"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import React from 'react'
import { ClipLoader } from "react-spinners"
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const user = useRecoilValue(userState)
    const [grindSize,setGrindSize] = useState("Whole Beans")
    const [size,setSize] = useState(250)
    const [quantity,setQuantity] = useState(1)
    const { productId } = useParams()
    const [current,setCurrent] = useState(null)
    const [showAlert,setShowAlert] = useState(false)
    const navigate = useNavigate()  
    const [loginAlert,setLoginAlert] = useState(false)  
    const price= useRef(null)     
    const [loading,setLoading] = useState(true) 
    
    React.useEffect(() => {
        if (showAlert) {
          toast.success('Items added to the cart!', {
            position: "top-right",  
            top : "60px",
            backgroundColor : coffee,
            autoClose: 5000,         
            hideProgressBar: true,  
            closeOnClick: true,      
            pauseOnHover: true,      
            draggable: true,    
            progress: undefined,   
          });
        }
    
        if (loginAlert) {
          toast.info('Login to proceed', {
            position: "top-right",  
            autoClose: 5000,       
            hideProgressBar: true,  
            closeOnClick: true,      
            pauseOnHover: true,    
            draggable: true,   
            progress: undefined,  
          });
        }
      }, [showAlert, loginAlert]);

    useEffect(() => {
        const getProduct = async() => {
            try{
                setLoading(true)
                const {data : response,error} = await supabase.from("products").select("*").eq("id",productId).single()
                if(error) throw new Error(`Error while fetching the product : ${error.message}`)
                if(!response || response.length===0) throw new Error(`Null Product`)
        
                setCurrent(response)
                price.current = response.price
                console.log(price.current)
            } catch(error){
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getProduct()
    },[])

    const handleAddToCart = async () => {
        if(!user){
            setLoginAlert(true)

            setTimeout(()=>{
                setLoginAlert(false)
            },3000)
        } else {
            try{
                const {data : cartId,error : cartIdError} = await supabase.from("cart").select("id").eq("user_id",user.id).single()
                if(cartIdError) throw new Error(`Error fetching cartId : ${cartIdError.message}`)
                console.log(cartId)
    
                const {data : response,error} = await supabase.from("cart_items").insert([{cart_id : cartId.id,product_id : productId,quantity : quantity,weight : size,grind_size : grindSize,price : price.current}])
    
                if(error) throw new Error(`Error while add item to the cart : ${error}`)
                console.log("Item added to the cart successfully",response)
                
                setShowAlert(true)
    
                setTimeout(()=>{setShowAlert(false)},3000)
            } catch(error) {
                console.error(`Error while adding to the cart ${error.message}`)
            }
        }
    }

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }

    if(!current) return <div></div>

    return (
        <>
        <ToastContainer/>
        <Container maxWidth={false} sx={{display : "flex",fontFamily : "Raleway"}}>
            <Box sx={{width : "50%",height : "100vh",display : "flex",alignItems : "center",justifyContent : "right",paddingRight : "20px"}}>
                <img src={current.image_url} style={{maxWidth : "700px"}}/>
            </Box>
                <Box sx={{maxWidth : "50%",height : "100vh",display : "flex",justifyContent : "left",paddingLeft : "20px",alignItems : "center"}}>
                    <Box sx={{width  : "70%",display : "flex",flexDirection : "column",gap : "1.5rem"}}>
                    <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{current.name}</Typography>
                    <Typography variant="h7" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{current.profile}</Typography>
                    <Typography>{current.description}</Typography>
                    <Box sx={{display : "flex",gap : "3rem"}}>
                        <Typography >{current.roast_type}</Typography>
                        <Typography>100% Arabica Coffee</Typography>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Grind size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={grindSize}
                            label="grind-size"
                            onChange={(e)=>{setGrindSize(e.target.value)}}
                        >
                            <MenuItem value={"Whole Beans"}>Whole Beans</MenuItem>
                            <MenuItem value={"Coarse Grind"}>Coarse Grind</MenuItem>
                            <MenuItem value={"Medium Grind"}>Medium Grind</MenuItem>
                            <MenuItem value={"Fine Grind"}>Fine Grind</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <FormControl sx={{width : "50%"}}>
                            <InputLabel id="size-select">size</InputLabel>
                            <Select
                                labelId="size-select"
                                id="size-simple-select"
                                defaultValue={size}
                                label="packet-size"
                                onChange={(e) => {
                                    setSize(e.target.value)
                                    price.current = current.price * (e.target.value / 250)
                                    console.log(price.current)
                                }}
                            >
                                <MenuItem value={250}>250</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{width : "50%"}}>
                            <InputLabel id="quantity-select">size</InputLabel>
                            <Select
                                labelId="quantity-select"
                                id="quantity-simple-select"
                                defaultValue={quantity}
                                label="quantity"
                                onChange={(e) => {
                                    setQuantity(e.target.value)
                                    price.current = price.current * e.target.value
                                }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>Price : {size===250 ? current.price : current.price * 2}</Typography>
                    </Box>
                    <Box sx={{display : "flex",gap : "3rem"}}>
                        <Button sx={buttonStyles} onClick={()=>{handleAddToCart()}}>Add to cart</Button>
                        <Button sx={buttonStyles} onClick={()=>{
                            handleAddToCart()
                            if(user) navigate("/cart")                                
                        }}>Buy now</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
        </>
    )
}

export default Product