import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
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

const CheckFormElement = () => {

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState(null);
  


  
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);




  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setError('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    console.log(error)
    if (error.type === "card_error" || error.type === "validation_error") {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }


  return (
    <form >
      <p className="text-black mb-4">Complete your payment here!</p>

      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } , marginTop : '30px' ,marginBottom : '50px' }}
            disabled={isLoading || !stripe || !elements}
            onClick={handleSubmit}
          >
             {isLoading ? "Loading..." : "Confirm Payment"}
          </Button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckFormElement;
