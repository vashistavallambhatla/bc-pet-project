import { Container, Typography ,Box ,Button} from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useEffect,useRef,useState } from "react"
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { userState } from "../atoms/state/userAtom"
import CartItem from "../components/cartItem"
import { productCardBtn } from "../src/commonStyles"
import { useNavigate } from "react-router-dom"
import { cartAtom, deleteAtom, totalAtom, cartUpdatedAtom } from "../atoms/state/cartAtom"
import ClipLoader from "react-spinners/ClipLoader";

const Cart = () => {
    const user = useRecoilValue(userState)
    const [cart,setCart] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const setCartState = useSetRecoilState(cartAtom)
    const setTotalAtom = useSetRecoilState(totalAtom)
    const [deleted,setDeleteAtom] = useRecoilState(deleteAtom)
    const [cartUpdated,setCartUpdated] = useRecoilState(cartUpdatedAtom)
    const cartIdRef = useRef(null)

    console.log(cartIdRef)

    useEffect(()=>{
        if(user){
            setLoading(true)
            const fetchCart = async() => {
                try {
                    const {data : cartId,error : cartError} = await supabase.from("cart").select("id").eq("user_id",user.id).single()

                    if(cartError) throw new Error(`Error fetching cartId : ${cartError.message}`)
                    if(!cartId) throw new Error(`No cart found for user`)
                    cartIdRef.current = cartId.id

                    const {data : cartItems,error : cartItemsError} = await supabase.from("cart_items").select("id,product_id,quantity,weight,price,products(name,image_url,price)").eq("cart_id",cartId.id)

                    if(cartItemsError) throw new Error(`Error fetching productIds : ${cartItemsError.message}`)
                    
                    setCartState(cartItems)
                    setCart(cartItems)
                } catch(error) {
                    console.error(error)
                } finally {
                    setLoading(false)
                    setDeleteAtom(false)
                    setCartUpdated(false)
                }
            } 
            
            fetchCart()
        } else {
            setLoading(false)
        }
    },[user,deleted,cartUpdated])

    const handleNext = async() => {
        try{
            console.log(cartIdRef)
            const final = totalPrice.toFixed(2)
            const {error} = await supabase.from("cart").update({total : final}).eq("id",cartIdRef.current)
            if(error) throw new Error('Error while finalizing the cart total',error.message)
            navigate("/checkout")
        } catch(error){
            console.error(error)
        }
    }

    const totalPrice = cart ? cart.reduce((total, cartItem) => {
        const price = cartItem.products.price * (cartItem.weight / 250);
        const quantity = cartItem.quantity;
        return total + price * quantity;
    }, 0) : 0;

    useEffect(() => {
        if (cart) {
            setTotalAtom(totalPrice);
        }
    }, [cart, totalPrice, setTotalAtom]);
    
    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }
      
    if (!cart || cart.length===0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',flexDirection : "column",alignItems : "center"}}>
                <Typography variant="h4" sx={{fontWeight : "bold"}}>{"Empty cart :("}</Typography>
                <img src="src/assets/empty_cart.png"></img>
            </div>
        );
    }

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
                    <Button sx={productCardBtn} onClick={handleNext}>CHECKOUT</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Cart