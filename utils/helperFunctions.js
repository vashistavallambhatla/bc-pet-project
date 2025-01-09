
function validateAddress(address) {
    const requiredFields = [
        "firstName",
        "lastName",
        "addressLine1",
        "city",
        "state",
        "zipCode",
        "country"
      ];

    for(const field of requiredFields){
        if(!address[field] || address[field].trim() === "") return false
    }

    return true
}

function isValidExpiryDate(date){
    console.log("date")
    const [month,year] = date.split("/")
    const expiryMonth = parseInt(month,10)
    const expiryYear = parseInt(year,10)

    const now = new Date()

    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth()
    
    if( expiryMonth < 1 || expiryMonth > 12) return false
    if(currentYear>expiryYear) return false
    if(currentYear === expiryYear && expiryMonth < currentMonth) return false
    return true
}

function isPaymentFormValid(paymentForm){
    const requiredFields = [
        "cardNumber",
        "cvv",
        "name",
        "expirationDate"
    ]

    for(const field of requiredFields){
        if(!paymentForm[field] || paymentForm[field].trim() === "") {
            return false
        }
    }

    if(!isValidCardNumber(paymentForm.cardNumber) || !isValidCardHolderName(paymentForm.name) || !isValidCvv(paymentForm.cvv) || !isValidExpiryDate(paymentForm.expirationDate)) {
        return false
    }

    return true
}

function isValidCvv(cvv){
    console.log("cvv")
    const cvvRegex = /^[0-9]{3,4}$/
    return cvvRegex.test(cvv)
}

function isValidCardHolderName(name) {
    console.log("name")
    return /^[A-Za-z\s]+$/.test(name);
}

function isValidCardNumber(cardNumber) {
    console.log("number")
    const cardNumberRegex =  /^[0-9]{15,16}$/
    return cardNumberRegex.test(cardNumber)
}


export {validateAddress,isPaymentFormValid}