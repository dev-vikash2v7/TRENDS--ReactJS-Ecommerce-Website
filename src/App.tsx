import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"; // Adjust the import path as necessary
import LoginPage from "./pages/LoginPage"; // Adjust the import path as necessary
import SignUpPage from "./pages/SignUpPage"; // Adjust the import path as necessary
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import Checkout from "./pages/Checkout/Checkout";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
    )
};

export default App;
