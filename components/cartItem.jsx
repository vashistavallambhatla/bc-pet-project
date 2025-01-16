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
        debounce( async(cartItemId,newQuantity) => {
            try {
                const {data,error} = await supabase.from("cart_items").update({quantity : newQuantity}).eq("id",cartItemId)
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
        debouncedUpdate(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            debouncedUpdate(item.id, newQuantity); 
        }
    };

    return (
        <Container maxWidth={false} sx={{display : "flex",gap : "2rem",backgroundColor : "white",padding : "20px",justifyContent : "space-between"}}>
            <Box>
                <img src={item.products.image_url} style={{width : "200px",height : "200px"}}></img>
            </Box>
            <Box sx={{display : "flex",flexDirection : "column", justifyContent : "center",gap : "1.5rem"}}>
                <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{item.products.name}</Typography>
                <Typography variant="h7" sx={{fontWeight : "bold"}}>Rs.{item.products.price}</Typography>
                <Box sx={{display : "flex",gap : "2rem"}}>
                    <Box sx={{display: "flex",gap: "1rem",alignItems: "center",justifyContent: "center"}}>
                        <button onClick={handleDecrement}>-</button>
                        <Typography>Quantity: {quantity}</Typography>
                        <button onClick={handleIncrement}>+</button>
                    </Box>
                    <Typography>Size: {item.weight}g</Typography>
                </Box>
            </Box>
            <IconButton onClick={()=>{handleDelete(item.id)}} >
                <DeleteIcon sx={{width : "100px"}}></DeleteIcon>
            </IconButton>
        </Container>
    )
}

export default CartItem