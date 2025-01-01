import { Container, Typography ,Box ,Button} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useEffect,useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../atoms/state/userAtom"
import CartItem from "../components/cartItem"
import { productCardBtn } from "../src/commonStyles"
import { useNavigate } from "react-router-dom"
import { cartAtom } from "../atoms/state/cartAtom"

const Cart = () => {
    const user = useRecoilValue(userState)
    const [cart,setCart] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const setCartState = useSetRecoilState(cartAtom)

    useEffect(()=>{

        if(user){

            const fetchCart = async() => {

                const {data : cartId,error : cartError} = await supabase.from("cart").select("id").eq("user_id",user.id).single()

                if(cartError) throw new Error(`Error fetching cartId : ${cartError.message}`)
                if(!cartId) throw new Error(`No cart found for user`)

                const {data : cartItems,error : cartItemsError} = await supabase.from("cart_items").select("id,product_id,quantity,weight,products(name,image_url,price)").eq("cart_id",cartId.id)

                if(cartItemsError) throw new Error(`Error fetching productIds : ${cartItemsError.message}`)
                if(!cartItems || cartItems.length===0) throw new Error(`No cartItems found for user`)
                    
                setCart(cartItems)
            }

            fetchCart()
        }
        setLoading(false)
    },[user])
    
    if(loading) return (
        <div>Loading...</div>
    )
    if(!cart) return <div></div>

    const totalPrice = cart.reduce((total, cartItem) => {
        const price = cartItem.products.price;
        const quantity = cartItem.quantity;
        setCartState(total+price*quantity)
        return total + price * quantity;
    }, 0); 

    return (
        <Container maxWidth={false} sx={{display : "flex",flexDirection : "column",alignItems : "center",marginTop : "60px"}}>
            <Box sx={{display : "flex",flexDirection : "column",boxSizing : "border-box"}}>
                {
                    cart.map(cartItem => (
                        <Box key={cartItem.id} sx={{width : "700px"}}>
                            <CartItem item={cartItem}/>
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{display : "flex",gap : "2rem",backgroundColor : "white",width : "700px",padding : "20px",justifyContent : "space-between",marginTop : "10px",boxSizing : "border-box"}}>
                <Typography variant="h6" sx={{fontWeight : "bold"}}>Total: Rs.{totalPrice.toFixed(2)}</Typography>
                <Box sx={{width : "200px"}}>
                    <Button sx={productCardBtn} onClick={()=>{navigate("/checkout")}}>CHECKOUT</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Cart