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
import { useRecoilValue,useRecoilState, useSetRecoilState } from "recoil";
import {addressFormAtom, cartAtom, newAddressAtom, newAddressOpen, newCardAtom, newPaymentCardOpen, paymentFormAtom, saveBillingAddress, saveShippingAddress, selectedAddressAtom, selectedCardAtom, totalAtom, useBillingAtom, useShippingAtom} from "../atoms/state/cartAtom.js"
import supabase from "../supabase/supabaseClient.js";
import { userState } from "../atoms/state/userAtom.js";
import { useNavigate } from "react-router-dom";
import { validateAddress,isPaymentFormValid} from "../utils/helperFunctions.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";


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
    const [addressForm,setAddressForm] = useRecoilState(addressFormAtom)
    const [paymentForm,setPaymentForm] = useRecoilState(paymentFormAtom)
    const user = useRecoilValue(userState)
    const total = useRecoilValue(totalAtom)
    const navigate = useNavigate()
    const [showConfirming,setShowConfirming] = useState(false)
    const [saveCard,setSaveCard]= useRecoilState(saveBillingAddress)
    const [saveAddress,setSaveAddress] = useRecoilState(saveShippingAddress)
    const [newAddress,setNewAddress] = useRecoilState(newAddressAtom)
    const [newCard,setNewCard] = useRecoilState(newCardAtom)
    const setSelectedAddress = useSetRecoilState(selectedAddressAtom)
    const setSelectedCard = useSetRecoilState(selectedCardAtom)
    const setUseAddress = useSetRecoilState(useShippingAtom)
    const setUseBilling = useSetRecoilState(useBillingAtom)
    const [errorToast,setErrorToast] = useState(null)

    const handleOrder = async () => {
      try {
        setShowConfirming(true)
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
          price : cartItem.price,
          weight : cartItem.weight,
          grind_size : cartItem.grind_size
        }));
    
        const { data: orderItemsData, error: orderItemsError } = await supabase.from("order_items").insert(orderItems).select();
    
        if (orderItemsError) throw new Error(`Error occurred while creating order items: ${orderItemsError.message}`);
        if (!orderItemsData || orderItemsData.length === 0) throw new Error('No order items created');
    
        console.log('Order items created successfully:', orderItemsData);

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
              expiry_date : paymentForm.expirationDate,
              card_name : paymentForm.name
            })
            if(error) throw new Error(`Error while saving the billing address`,error.message)
            console.log('Billing address saved successfully')
          } catch(error) {
            console.error(error)
          }
        }

        if(saveAddress && addressForm) await saveShippingDetails()
        if(saveCard && paymentForm) await saveBillingDetails()

        await deleteCartItems()

        sessionStorage.removeItem("shippingAddress")
        sessionStorage.removeItem("billingAddress")
        setAddressForm({})
        setPaymentForm({})
        setNewAddress(null)
        setNewCard(null)
        setSaveCard(false)
        setSaveAddress(false)
        setSelectedAddress(null)
        setSelectedCard(null)
        setUseAddress(false)
        setUseBilling(false)
        
        navigate("/confirmed")
      } catch (error) {
        console.error('Error in handleOrder:', error);
      } finally{
        setShowConfirming(false)
      }
    }

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
        } 
        else alert("Fill in all the fields")

      } else if(activeStep === 1){
        const validation = isPaymentFormValid(paymentForm)

        if(validation.isValid){
          setActiveStep(currentStep => currentStep+1)
          console.log(JSON.stringify(paymentForm))
          console.log()
          if(newCard) sessionStorage.setItem("billingAddress",JSON.stringify(newCard))
        } 
        else {
          setErrorToast(validation.errorMessage)
          setTimeout(()=>{setErrorToast(null)},500)
        }

      }
      else if(activeStep === steps.length - 1) {
        handleOrder();
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

    React.useEffect(() => {
      if (errorToast) {
        toast.info(errorToast, {
          position: "top-right",  
          autoClose: 3000,       
          hideProgressBar: true,  
          closeOnClick: true,      
          pauseOnHover: true,    
          draggable: true,   
          progress: undefined,  
        });
      }
    },[errorToast])

    if (showConfirming) {
      return (
        <>
        <Container>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
                flexDirection : "column"
              }}
            >
              <ClipLoader size={500} color="#28a745" />
              <Typography variant="h2" sx={{color : "#28a745",fontWeight : "bold"}}>CONFIRMING ORDER!</Typography>
            </Box>
        </Container>
        </>
      );
    }

    return (
      <>
        <ToastContainer></ToastContainer>
        <Container>
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
      </>
    );
};

export default CheckOut;