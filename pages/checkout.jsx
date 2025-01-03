import { Container, Box, Typography, Button, TextField } from "@mui/material";
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
import { useRecoilValue } from "recoil";
import {addressFormAtom, cartAtom, paymentFormAtom, totalAtom} from "../atoms/state/cartAtom.js"
import supabase from "../supabase/supabaseClient.js";
import { userState } from "../atoms/state/userAtom.js";

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

    const handleOrder = async () => {
      try {
        const { data: order, error: orderError } = await supabase.from("orders").insert([{
          user_id: user.id,
          total_amount: total,
          shipping_address: JSON.stringify(addressForm),
          billing_address: JSON.stringify(paymentForm),
        }]);
    
        if (orderError) throw new Error(`Error occurred while creating an order: ${orderError.message}`);
        if (!order || order.length === 0) throw new Error('No order created');
    
        const orderId = order[0].id;
    
        const orderItems = cart.map(cartItem => ({
          order_id: orderId,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
        }));
    
        const { data: orderItemsData, error: orderItemsError } = await supabase.from("order_items").insert(orderItems);
    
        if (orderItemsError) throw new Error(`Error occurred while creating order items: ${orderItemsError.message}`);
        if (!orderItemsData || orderItemsData.length === 0) throw new Error('No order items created');
    
        console.log('Order items created successfully:', orderItemsData);
      } catch (error) {
        console.error('Error in handleOrder:', error);
      }
    };
    

    const handleNext = () => {
        setActiveStep(currentStep => {
            const newStep = currentStep + 1;
            localStorage.setItem("activeStep", newStep);
            return newStep;
        });
    }
    const handlePrev = () => {
        setActiveStep(currentStep => {
            const newStep = currentStep - 1;
            localStorage.setItem("activeStep", newStep);
            return newStep;
        });
    }

    
    return (
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
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handlePrev}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
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