import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Typography,Box, IconButton,Button } from "@mui/material"
import supabase from '../supabase/supabaseClient';
import { useSetRecoilState } from 'recoil';
import { cartUpdatedAtom, deleteAtom } from '../atoms/state/cartAtom';
import debounce from 'lodash.debounce';
import { useCallback, useState, useEffect } from 'react';

const CartItem = ({item}) => {
    const setDeleteAtom = useSetRecoilState(deleteAtom)
    const [quantity,setQuantity] = useState(item.quantity)
    const setCartUpdated = useSetRecoilState(cartUpdatedAtom)

    const handleDelete = async(cartItemId) => {
        try {
            const {data : response , error} = await supabase.from("cart_items").delete().eq('id',cartItemId)
        
            if(error) throw new Error(`Error while deleting the cartItem : ${error.message}`)
            
            console.log(`Deleted cart items: `,response)
            setDeleteAtom(true)
        } catch(error){
            console.error(`Error: `,error)
        }
    }

    const debouncedUpdate = useCallback(
        debounce( async(cartItemId,newQuantity,updatedPrice) => {
            try {
                const {data,error} = await supabase.from("cart_items").update({quantity : newQuantity,price : updatedPrice}).eq("id",cartItemId)
                if(error) throw new Error("Error while updating the quantity",error.message)
                setCartUpdated(true)
            } catch(error){
                console.error(error)
            }
        },500),
        []
    )

    useEffect(() => {
        return () => {
            debouncedUpdate.cancel();
        };
    }, [debouncedUpdate]);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        const newPrice = item.price + item.products.price * (item.weight / 250)
        debouncedUpdate(item.id, newQuantity,newPrice);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            const newPrice = item.price - item.products.price * (item.weight / 250)
            debouncedUpdate(item.id, newQuantity, newPrice); 
        }
    };

    return (
        <Container maxWidth={false} sx={{display : "flex",gap : "2rem",backgroundColor : "white",padding : "20px",justifyContent : "space-between"}}>
            <Box>
                <img src={item.products.image_url} style={{width : "200px",height : "200px"}}></img>
            </Box>
            <Box sx={{display : "flex",flexDirection : "column", justifyContent : "center",gap : "1.5rem"}}>
                <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{item.products.name}</Typography>
                <Box sx={{display : "flex",gap : "2rem"}}>
                    <Box sx={{display: "flex",gap: "1rem",alignItems: "center",justifyContent: "center"}}>
                        <button onClick={handleDecrement}>-</button>
                        <Typography>Quantity : {quantity}</Typography>
                        <button onClick={handleIncrement}>+</button>
                    </Box>
                    <Typography>Size: {item.weight}g</Typography>
                </Box>
                <Typography>{item.grind_size}</Typography>
                <Typography variant="h7" sx={{fontWeight : "bold"}}>Rs.{item.price}</Typography>
            </Box>
            <IconButton onClick={()=>{handleDelete(item.id)}} >
                <DeleteIcon sx={{width : "100px"}}></DeleteIcon>
            </IconButton>
        </Container>
    )
}

export default CartItem