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
      } else alert("Fill in all the fields")
    } else if(activeStep === 1){
      if(isPaymentFormValid(paymentForm)){
        setActiveStep(currentStep => currentStep+1)
      } else alert("Invalid details")
    }
    else if(activeStep === steps.length - 1) {
      handleOrder();
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
      if(newAddress === false){
        navigate("/checkout")
        setNewAddress(true)
      }
      else navigate("/cart")
    } else if(activeStep === 1){
      if(newCard === true){
        navigate("/checkout")
        setNewCard(false)
      } else {
        setActiveStep(currentStep => currentStep - 1)
      }
    }
    else {
      setActiveStep(currentStep => {
        const newStep = currentStep - 1;
        localStorage.setItem("activeStep", newStep);
        return newStep;
    });
    }
} 

export {handlePrev,handleNext,deleteCartItems,saveBillingDetails,saveShippingDetails}