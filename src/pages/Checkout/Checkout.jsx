import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BASE_URL } from "../../config";
import CheckFormElement from "./CheckFormElement";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51OcOelSJbNHwzu2iaWHv6Pyeqbt8rMJzFPjWtuSatm8FLnJQOs2GR1lql3A7OYyu1s7oMX9wYN76xp9ZE4gFw8L300fyK85med"
);


const Checkout  = () => {

  const [clientSecret , setClientSecret] = useState('')

  const currency = "usd"

  const {cartList , totalPrice} = useSelector(state => state.cart )
  
  
  useEffect(()=>{
    
    const data = {
      amount : totalPrice,
      currency : currency
    }
    
    axios.post(`${BASE_URL}/create-payment-intent`,data)
    .then((res)=>{
     setClientSecret(res.data.clientSecret)
   })
    .catch(err=>console.log(err))


  },[])


 const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} lg={6} padding={3}>
          {/* <Elements stripe={stripePromise} options={options}> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: "2.4rem", fontWeight: "bold" }}>
              Contact
            </div>
           
          </div>
          <TextField
            id="outlined-basic"
            label="Email ID or Phone Number"
            variant="outlined"
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Email me with news and offers"
          />
          <br />
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: "bold",
              marginTop: 32,
              marginBottom: "1.4rem",
            }}
          >
            Delivery
          </div>

          <FormControl fullWidth>
            <InputLabel id="dropdown-label">Country/Region</InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              // value={selectedValue}
              // onChange={handleChange}
            >
              <MenuItem value="option1">United States</MenuItem>
              <MenuItem value="option2">Canada</MenuItem>
              <MenuItem value="option3">Brazil</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={1.4} style={{ marginTop: 0 }}>
            <Grid item xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="First Name (optional)"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            style={{ marginTop: 14 }}
            fullWidth
          />

          <TextField
            id="outlined-basic"
            label="Apartment, suite, etc. (optional)"
            variant="outlined"
            style={{ marginTop: 14 }}
            fullWidth
          />

          <Grid container spacing={1.4} style={{ marginTop: 0 }}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              {/* <InputLabel id="dropdown-label">State</InputLabel> */}
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">State</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  // value={selectedValue}
                  // onChange={handleChange}
                >
                  <MenuItem value="option1">Alabama</MenuItem>
                  <MenuItem value="option2">Alaska</MenuItem>
                  <MenuItem value="option3">California</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="ZIP Code"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox />}
            label="Save this information for next time"
          />

          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: 32,
              marginBottom: "1.4rem",
            }}
          >
            Shipping Method
          </div>

          <TextField
            disabled
            fullWidth
            placeholder="Enter your shipping address to view available shipping methods."
            style={{ backgroundColor: "#f5f5f5", border: "none" }}
          />

          {/* <CheckoutForm /> */}
   {    clientSecret && <Elements options={options} stripe={stripePromise}>
            <CheckFormElement clientSecret = {clientSecret}/>
          </Elements>}
          {/* </Elements> */}
  

        </Grid>
        <Grid item xs={12} lg={6}>
          <div
            style={{
              position: "fixed",
              marginLeft: "auto",
              backgroundColor: "#f5f5f5",
              height: "100vh",
              width: "100%",
              padding: 26,
            }}
          >


            <div style={{ width: "50%" }}>

          {cartList.map((item)=>
            (
              <div style={{ display: "flex", alignItems: "center", gap: 14  , marginTop : "10px"}}>

                {/* <img
                  src="https://cdn.shopify.com/s/files/1/0811/4713/4258/files/product-2_81c1b7c5-321b-4d77-ae0c-cdcb436bcbc9_64x64.png?v=1692248380"
                  alt="cart"
                  style={{ height: "100%" }}
                /> */}
                <img
                  src={item.imageUrl}
                  alt="cart"
                  style={{ height: "10%" , width : "10%" }}
                />

                  <div>
                    <h3
                      style={{ fontSize: "1.4rem", fontWeight: 500, margin: 0 }}
                    >
                      {item.title}
                    </h3>

                    {/* <small>Beige / XS</small> */}

                    <h3
                      style={{ fontSize: "1rem", fontWeight: 400, margin: 5 }}
                    >
                    Price :  ${item.price}
                    <br/>
                    Quantity :  {item.quantity}
                    </h3>

                  </div>

              </div>
          ))}

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "fit-content",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "1rem", margin: "8px 0" }}>Subtotal</p>
                <p style={{ fontSize: "1rem", margin: "8px 0" }}>$ {totalPrice}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "fit-content",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "1rem", margin: "8px 0" }}>Shipping</p>
                <p style={{ fontSize: "1rem", margin: "8px 0" }}>
                  Enter shipping address
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "fit-content",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "1.4rem" }}>Total</p>
                <p style={{ fontSize: "1.4rem" }}>
                  USD <span style={{ fontWeight: 500 }}>${totalPrice}</span>
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
