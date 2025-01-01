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
import {cartAtom} from "../atoms/state/cartAtom.js"

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
    const cartState = useRecoilValue(cartAtom)

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

    useEffect(() => {
        const localStorageActiveState = localStorage.getItem("activeStep");
        if (localStorageActiveState !== null) {
            const parsedStep = Number(localStorageActiveState);
            if (!isNaN(parsedStep)) {
                setActiveStep(parsedStep);
            }
        }
        console.log(cartState)
    }, []);
    
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