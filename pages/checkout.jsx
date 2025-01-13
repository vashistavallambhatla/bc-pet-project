import { Container, Box, Typography, Button, TextField,Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AddressForm from "../components/addressForm";
import PaymentForm from "../components/paymentForm";
import { useEffect, useState } from "react";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Review from "../components/review";
import { coffee } from "../src/commonStyles";
import { useRecoilValue,useRecoilState } from "recoil";
import {addressFormAtom, cartAtom, newAddressAtom, newAddressOpen, newCardAtom, newPaymentCardOpen, paymentFormAtom, saveBillingAddress, saveShippingAddress, totalAtom} from "../atoms/state/cartAtom.js"
import supabase from "../supabase/supabaseClient.js";
import { userState } from "../atoms/state/userAtom.js";
import { useNavigate } from "react-router-dom";
import { validateAddress,isPaymentFormValid} from "../utils/helperFunctions.js";

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step){
    switch(step){
        case 0 :
            return <AddressForm/>
        case 1 :
            return <PaymentForm/>
        case 2 :
            return <Review/>
        default:
            throw new Error('Unknown Step')
    }
}

const CheckOut = () => {
    const [activeStep,setActiveStep] = useState(0)
    const cart = useRecoilValue(cartAtom)
    const addressForm = useRecoilValue(addressFormAtom)
    const paymentForm = useRecoilValue(paymentFormAtom)
    const user = useRecoilValue(userState)
    const total = useRecoilValue(totalAtom)
    const navigate = useNavigate()
    const [showAlert,setShowAlert] = useState(false)
    const [saveCard,setSaveCard] = useRecoilState(saveBillingAddress)
    const [newAddress,setNewAddress] = useRecoilState(newAddressAtom)
    const [newCard,setNewCard] = useRecoilState(newCardAtom)

    const handleOrder = async () => {
      try {
        const { data: order, error: orderError } = await supabase.from("orders").insert([{
          user_id: user.id,
          total_amount: total,
          shipping_address: JSON.stringify(addressForm),
          billing_address: JSON.stringify(paymentForm),
        }]).select();
    
        if (orderError) throw new Error(`Error occurred while creating an order: ${orderError.message}`);
      
        if (!order || order.length === 0) throw new Error('No order created');
    
        const orderId = order[0].order_id;
    
        const orderItems = cart.map(cartItem => ({
          order_id: orderId,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
        }));
    
        const { data: orderItemsData, error: orderItemsError } = await supabase.from("order_items").insert(orderItems).select();
    
        if (orderItemsError) throw new Error(`Error occurred while creating order items: ${orderItemsError.message}`);
        if (!orderItemsData || orderItemsData.length === 0) throw new Error('No order items created');
    
        console.log('Order items created successfully:', orderItemsData);
        deleteCartItems()

        const saveShippingDetails = async() => {
          try{
            const {error} = await supabase.from("shipping_address").insert({
              user_id : user.id,
              first_name : addressForm.firstName,
              last_name : addressForm.lastName,
              address_line1 : addressForm.addressLine1,
              address_line2 : addressForm.addressLine2,
              city : addressForm.city,
              state : addressForm.state,
              country : addressForm.country,
              zip_code : addressForm.zipCode
            })
  
            if(error) throw new Error(`Error while saving the shipping address`,error.message)
            console.log('Shipping address saved successfully')
          } catch(error){
              console.error(error)
          }
        }

        const saveBillingDetails = async() => {
          try{
            const {error} = await supabase.from("billing_address").insert({
              user_id : user.id,
              card_number : paymentForm.cardNumber,
              cvv : paymentForm.cvv,
              expiry_date : paymentForm.expirationDate
            })
            if(error) throw new Error(`Error while saving the billing address`,error.message)
            console.log('Billing address saved successfully')
          } catch(error) {
            console.error(error)
          }
        }

        if(saveShippingAddress && addressForm) saveShippingDetails()
        if(saveCard && paymentForm) saveBillingDetails()

        setShowAlert(true)
        
        setTimeout(()=>{
          setShowAlert(false)
        },3000)
        navigate("/cart")
      } catch (error) {
        console.error('Error in handleOrder:', error);
      } 
    };

    const deleteCartItems = async() => {
      try {

        const {data : cartId,error : cartIdError} = await supabase.from("cart").select("id").eq("user_id",user.id).single()

        if(cartIdError) throw new Error(`Error while fetching cartId`,cartIdError)
        if(!cartId) throw new Error(`No associated cartId found`)
        
        const {data : deletedItems,error : deleteCartError} = await supabase.from("cart_items").delete().eq("cart_id",cartId.id)
        if(deleteCartError) throw new Error(`Error while deleting the cartItems`,deleteCartError)
        console.log(deletedItems)
        console.log('Cart items deleted successfully')
      } catch(error) {
        console.error(error)
      }
    }
    
    const handleNext = () => {
      if(activeStep === 0){
        if(validateAddress(addressForm)){
          setActiveStep(currentStep => currentStep+1)
          if(newAddress) sessionStorage.setItem("shippingAddress",JSON.stringify(newAddress))
        } else alert("Fill in all the fields")
      } else if(activeStep === 1){
        if(isPaymentFormValid(paymentForm)){
          setActiveStep(currentStep => currentStep+1)
          console.log(JSON.stringify(paymentForm))
          console.log()
          if(newCard) sessionStorage.setItem("billingAddress",JSON.stringify(newCard))
        } else alert("Invalid details")
      }
      else if(activeStep === steps.length - 1) {
        handleOrder();
        sessionStorage.removeItem("shippingAddress")
        sessionStorage.removeItem("billingAddress")
    } else {
        setActiveStep(currentStep => {
            const newStep = currentStep + 1;
            localStorage.setItem("activeStep", newStep);
            return newStep;
    });
    }
    }
    const handlePrev = () => {
        if(activeStep === 0){
          navigate("/cart")
        }
        else {
          setActiveStep(currentStep => {
            const newStep = currentStep - 1;
            localStorage.setItem("activeStep", newStep);
            return newStep;
        });
        }
    }  

    return (
        <Container>
          {
                showAlert && (
                    <Box sx={{position : "fixed",top : "50%",left : "50%",transform: 'translate(-50%, -50%)',width : "600px",zIndex : 1300}}>
                        <Alert variant="filled"  severity="success">
                            {"Order Confirmed :)"}
                        </Alert>
                    </Box>
                )
            }
            <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 ,mt : "40px"}}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 }}}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                      justifyContent : "space-between"
                    },
                  ]}
                >
                  
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handlePrev}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                 
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handlePrev}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none'},width: { xs: '100%', sm: 'fit-content', backgroundColor : coffee}}}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content'} }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
        </Container>
    );
};

export default CheckOut;