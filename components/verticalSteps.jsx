import * as React from 'react';
import {Box,Stepper,Step,StepLabel,Typography} from "@mui/material"

const steps = [
  {
    label: 'Processing',
    description: 'Your order is being processed. We are verifying and preparing it for dispatch.',
  },
  {
    label: 'Dispatched',
    description: 'Your order has been dispatched and is on its way to the delivery location.',
  },
  {
    label: 'In Transit',
    description: 'Your order is currently in transit. It is on its way and should arrive soon.',
  },
  {
    label: 'Delivered',
    description: 'Your order has been delivered successfully. Thank you for your purchase!',
  },
];

export default function VerticalStaticStepper({currentStep}) {

  return (
    <Box sx={{width : "30%",transform: "translateX(20%)"}}>
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                color: index === currentStep ? 'primary.main' : 'text.secondary',
              }}
            >
              {step.label}
            </StepLabel>
            <Typography sx={{ paddingLeft: 2, marginBottom: 2, margin : "0 auto"}}>
              {index === currentStep ? step.description : ''}
            </Typography>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
