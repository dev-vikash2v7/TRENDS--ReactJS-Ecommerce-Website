import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"; // Adjust the import path as necessary
import LoginPage from "./pages/LoginPage"; // Adjust the import path as necessary
import SignUpPage from "./pages/SignUpPage"; // Adjust the import path as necessary
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
