import { Container,Box,TextField,Button, FormControlLabel,Typography,Checkbox } from "@mui/material"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Grid2';
import { useRecoilState, useRecoilValue } from "recoil";
import { addressFormAtom, cartAtom, newPaymentCardOpen, paymentFormAtom, saveBillingAddress, selectedCardAtom } from "../atoms/state/cartAtom";
import { useEffect,useState } from "react";
import { userState } from "../atoms/state/userAtom";
import supabase from "../supabase/supabaseClient";


const PaymentForm = () => {
    const user = useRecoilValue(userState)
    const [paymentForm,setPaymentForm] = useRecoilState(paymentFormAtom)
    const cart = useRecoilValue(cartAtom)
    const [addNewCard,setAddNewCard] = useRecoilState(newPaymentCardOpen)
    const [cards,setCards] = useState(null)
    const [selectedCard,setSelectedCard] = useRecoilState(selectedCardAtom)
    const [save,setSave] = useRecoilState(saveBillingAddress)

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPaymentForm((prev) => ({...prev,[name] : value}))
    }
    
    const handleSelection = (card) => {
        if(selectedCard === card.id.toString()){
            setSelectedCard(null)
            setPaymentForm(null)
            return
        }
        setSelectedCard(card.id.toString())
        setPaymentForm({
            name : card.card_name,
            cvv : card.cvv,
            expirationDate : card.expiry_date,
            cardNumber : card.card_number
        })
    }

    useEffect(()=>{
        if(!cart){
            localStorage.removeItem("activeState")
            navigate("/cart")
        }
    },[])

    useEffect(()=>{
        const getCards = async () =>  {
            if(user){
                try{
                    const {data : cardsArray,error : cardsError} = await supabase.from("billing_address").select("*").eq("user_id",user.id)
                    if(cardsError) throw new Error(`Error while fetching payment cards`,error)
                    if(!cardsArray || cardsArray.length === 0) throw new Error(`No exiting cards found`)
                    setCards(cardsArray)
                    console.log(cardsArray)
                } catch(error) {
                    console.error(error)
                }
            }
        }

        getCards()
    },[user])

    if(!cart) return null

    if(!addNewCard) return (
        <Container maxWidth="lg" sx={{display : "flex",justifyContent : "center",flexDirection : "column",alignItems : 'center',mt : 10}}>
            {
                cards && cards.map((card) => (
                    <Box key={card.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        backgroundColor: "white",
                        width: "700px",
                        padding: "20px",
                        borderRadius: '4px',
                        border: selectedCard === card.id.toString() ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }}
                    onClick={()=>handleSelection(card)}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedCard === card.id.toString()}
                                />
                            }
                            label={
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="subtitle1">{card.card_name}</Typography>
                                    <Typography variant="body2" color="text.secondary">Card Number : {card.card_number}</Typography>
                                    <Typography variant="body2" color="text.secondary">CVV : {card.cvv}</Typography>
                                    <Typography variant="body2" color="text.secondary">Expiry Date : {card.expiry_date}</Typography>
                                </Box>  
                            }
                        >

                        </FormControlLabel>
                    </Box>
                ))
            }
            <Button sx={{display : 'flex',justifyContent : "center",mt : 5,backgroundColor : "white",width : "300px",padding : "10px 0px"}} onClick={()=>{
                setAddNewCard(true)
                setPaymentForm({})
            }}>
                + Add New Card
            </Button>
        </Container>
    )

    return (
        <>
        <Container maxWidth="lg" sx={{display : 'flex',justifyContent : "center",mt : 10,backgroundColor : "white",width : "700px",padding : "30px 0px"}}>
            <Box sx={{ mt: 4, mb: 4 , width : "600px"}}>
                <CreditCardIcon sx={{fontSize : 60,mb : 2}}></CreditCardIcon>
                <Grid container spacing={3}>
                    <Grid item size={8}>
                    <TextField
                            required
                            id="cardNumber"
                            name="cardNumber"
                            label="Card number"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.cardNumber || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={4}>
                    <TextField
                            required
                            id="cvv"
                            name="cvv"
                            label="CVV"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.cvv || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                    <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.name || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                    <TextField
                            required
                            id="expirationDate"
                            name="expirationDate"
                            label="Expiration date"
                            fullWidth
                            variant="outlined"
                            value={paymentForm.expirationDate || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <FormControlLabel
            control={
                <Checkbox
                checked={save}
                onChange={()=>{setSave(prev => !prev)}}
                />
            }
            label={<Typography>Save this card for future orders</Typography>}
            sx={{width : "100%",display : "flex",justifyContent : "center",mt : "1rem"}}
        />
        </>
    )
}

export default PaymentForm