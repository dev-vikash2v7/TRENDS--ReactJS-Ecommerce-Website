import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_URL } from "../../config";
import {
    Button,
  } from "@mui/material";
interface CheckFormElementProps {
  // Add any props if needed
}

const CheckFormElement: React.FC<CheckFormElementProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setMessage(
        paymentIntent?.status === "succeeded"
          ? "Your payment succeeded"
          : "Unexpected error occurred"
      );
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: BASE_URL,
      },
    });

    if (error && (error.type === "card_error" || error.type === "validation_error")) {
        setMessage(error.message || "An error occurred during payment processing");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-black mb-4">Complete your payment here!</p>
      <PaymentElement />
      <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
            disabled={isLoading || !stripe || !elements}
          >
             {isLoading ? "Loading..." : "Pay now"}
          </Button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckFormElement;
