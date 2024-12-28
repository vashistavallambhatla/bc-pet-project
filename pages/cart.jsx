import { Container } from "@mui/material"
import supabase from "../supabase/supabaseClient"
import { useEffect,useState } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/state/userAtom"

const Cart = () => {
    const user = useRecoilValue(userState)
    const [cart,setCart] = useState(null)

    useEffect(()=>{

        if(user){

            const fetchCart = async() => {

                const {data : cartId,error : cartError} = await supabase.from("cart").select("id").eq("user_id",user.id).single()

                if(cartError) throw new Error(`Error fetching cartId : ${cartId}`)
                if(!cartId) throw new Error(`No cart found for user`)

                const {data : productIds,error : productIdsError} = await supabase.from("cartItems").select("product_id").eq("cart_id",cartId)

                if(productIdsError) throw new Error(`Error fetching productIds : ${productIdsError}`)
                if(!productIds || productIds.length===0) throw new Error(`No cartItems found for user`)

                const productIdsArray = productIds.map(item => item.product_id)
                
                const {data : products,error : productsError} = await supabase.from("products").select("*").in("id",productIdsArray)

                if(productsError) throw new Error(`Error while fetching products : ${productsError}`)
                if(!products || products.length===0) throw new Error(`No products found`)

                setCart(products)
            }

            fetchCart()
        }
    },[])

    return (
        <Container maxWidth={false}>
            Cart
        </Container>
    )
}

export default Cart