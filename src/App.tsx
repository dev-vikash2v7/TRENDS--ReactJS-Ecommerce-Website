import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"; // Adjust the import path as necessary
import LoginPage from "./pages/LoginPage"; // Adjust the import path as necessary
import SignUpPage from "./pages/SignUpPage"; // Adjust the import path as necessary
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import Checkout from "./pages/Checkout/Checkout";
import product1Image from "./assets/images/product1.jpg"
import product2Image from "./assets/images/product2.jpg";
import blackImage from "./assets/images/black.jpg";
import lastImage from "./assets/images/last.jpg";
import product5Image from "./assets/images/product-5.jpg";
import product6Image from "./assets/images/product-6.jpg";
import product7Image from "./assets/images/product-7.jpg";
import product8Image from "./assets/images/product-8.jpg";

const products = [
  {
    id: 1,
    title: "PURE COTTON T-SHIRT",
    imageUrl: product1Image,
    price: 48.0,
  },
  {
    id: 2,
    title: "OVERSIZED TEE - PEARL PINK",
    imageUrl: product2Image,
    price: 40.0,
  },
  {
    id: 3,
    title: "OVERSIZED TEE - BLACK",
    imageUrl: blackImage,
    price: 59.0,
  },
  {
    id: 4,
    title: "LOOSE FIT CREW-NECK T-SHIRT",
    imageUrl: lastImage,
    price: 75.0,
  },

  {
    id: 5,
    title: "FULL-SLEEVE HOODED T-SHIRT",
    imageUrl: product5Image,
    price: 79.0,
  },
  {
    id: 6,
    title: "STYLISH FIT HOODIE FOR MEN",
    imageUrl: product6Image,
    price: 50.0,
  },
  {
    id: 7,
    title: "MEN FULL SLEEVE SWEATSHIRT",
    imageUrl: product8Image,
    price: 40.0,
  },
  {
    id: 8,
    title: "BONO - PLAIN MEN'S HOODIE",
    imageUrl: product7Image,
    price: 60.0,
  },
];

const App: React.FC = () => {

  const accessToken = localStorage.getItem("accessToken")
    if(!accessToken){
      return (
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<LoginPage />}  />
      </Routes>
    </Router>
      )
    }
    return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage products = {products} />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/product/:productId" element={<ProductDetailsPage products = {products} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
    )
};

export default App;
