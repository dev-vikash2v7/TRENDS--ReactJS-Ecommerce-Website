import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_URL } from "../../config";
import {
    Button,
  } from "@mui/material";


// interface CheckFormElementProps {
//   // Add any props if needed
// }


// const ClientSecret  = {
//      clientSecret : string | undefined  ,
//      error : string | undefined 
// }

// interface IFetchPaymentIntentClientSecret  {
//     () : Promise<{ 
//            clientSecret : string | undefined  ,
//            error : string | undefined }
//             | undefined> 
//   } 

const CheckFormElement = (props) => {

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchPaymentIntentClientSecret  = async( ) => {
    
    try{
  const res = await  fetch(BASE_URL + '/create-payment-intent', {
    method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: 1000 ,
        currency: 'inr',
        gateway: 'card',
      }),} )


  const { clientSecret  , error}  = await res.json();

  return { clientSecret  , error} 
    }

  catch(e ){
      console.log( 'fetchPaymentIntentClientSecret Error : ' ,  e ) 
      alert('Server Error '+  e.message)
      setIsLoading(false);
  }
}



async function load() {
   if (!stripe) {
     return;
   }
  
const {clientSecret , error }   = await  fetchPaymentIntentClientSecret();

if(error || !clientSecret){
  console.log('USER ERROR  : ' , error)
  alert('Unable to process payment ! Try Again')
  setIsLoading(false)
  return  
}

stripe?.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  console.log('paite' , paymentIntent)
  setMessage(
    paymentIntent?.status === "succeeded"
      ? "Your payment succeeded"
      : "Unexpected error occurred"
  );
});
}
  // useEffect( () => {
    

  // load()

  // }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    load()
    // const { results , error } = await stripe.confirmPayment({
    //   elements,
    // });

    // if (error && (error.type === "card_error" || error.type === "validation_error")) {
    //     setMessage(error.message || "An error occurred during payment processing");
    // }
    // console.log('ddd' ,  results)
    // console.log('ddd' , error )

    setIsLoading(false);
  };


  return (
    <form >
      <p className="text-black mb-4">Complete your payment here!</p>
      <PaymentElement />
      <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
            disabled={isLoading || !stripe || !elements}
            onClick={handleSubmit}
          >
             {isLoading ? "Loading..." : "Pay now"}
          </Button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckFormElement;
