// PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { BASE_URL } from '../../config';


const PaymentForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const stripe = useStripe();

  const [loading , setLoading] = useState(false);



  const fetchPaymentIntentClientSecret = async  ( ) => {
    
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


  const { clientSecret  , error} = await res.json();
  return { clientSecret  , error} ;
    }

  catch(e ){
      console.log( 'fetchPaymentIntentClientSecret Error : ' ,  e ) 
      alert('Server Error '+  e.message)
      setLoading(false);
  }
}




  const handleSubmit = async (event ) => {
    event.preventDefault();

    setLoading(true)


    const {clientSecret , error}  = await  fetchPaymentIntentClientSecret();

    if(error || !clientSecret){
      console.log('USER ERROR  : ' , error)
      alert('Unable to process payment ! Try Again')
      setLoading(false)
      return 
  }

    
    try{

      
      const {error , paymentIntent} = await stripe.confirmPayment(clientSecret , 
        {
          paymentMethodType: 'Card' ,
          paymentMethodData: { 
            billingDetails: {
              name : 'vikash',
              email : 'vk@gmail.com'
            } 
          },
        });

          if (error) {
            console.log('PAYMENT ERROR : ' , error.message)
            alert(error?.localizedMessage);
          } 
          else if (paymentIntent) {
             console.log('paymentIntent : ' , paymentIntent)
             alert(`Payment of INR ${1000}   is successful! `)
          }
      }
      catch(e){
          console.log(e.message)
          alert('SERVER ERROR : ' +e.message)
      }
      setLoading(false)



  
  };




  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      {paymentSuccess && <p style={{ color: 'green' }}>{paymentSuccess}</p>}
    </form>
  )


}
export default PaymentForm
