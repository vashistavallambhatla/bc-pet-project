import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Typography,Box, IconButton } from "@mui/material"
import supabase from '../supabase/supabaseClient';

const CartItem = ({item}) => {

    const handleDelete = async(cartItemId) => {
        try {
            const {data : response , error} = await supabase.from("cart_items").delete().eq('id',cartItemId)
        
            if(error) throw new Error(`Error while deleting the cartItem : ${error.message}`)
            
            console.log(`Deleted cart items: `,response)
            window.location.reload()
        } catch(error){
            console.error(`Error: `,error)
        }
    }

    return (
        <Container maxWidth={false} sx={{display : "flex",gap : "2rem",backgroundColor : "white",padding : "20px",justifyContent : "space-between"}}>
            <Box>
                <img src={item.products.image_url} style={{width : "200px",height : "200px"}}></img>
            </Box>
            <Box sx={{display : "flex",flexDirection : "column", justifyContent : "center",gap : "1.5rem"}}>
                <Typography variant="h4" sx={{fontWeight : "bold",fontFamily : "Raleway"}}>{item.products.name}</Typography>
                <Typography variant="h7" sx={{fontWeight : "bold"}}>Rs.{item.products.price}</Typography>
                <Box sx={{display : "flex",gap : "1rem"}}>
                    <Typography>Quantity: {item.quantity}</Typography>
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