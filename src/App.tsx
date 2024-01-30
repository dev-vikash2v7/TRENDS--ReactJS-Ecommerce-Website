import React,{useEffect} from "react";
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
import axios from "axios";
import { BASE_URL } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setCartList } from "./Redux/Slices/cart.slice";
import CartDrawer from "./components/CartDrawer/CartDrawer";

import { RootState } from "./Redux/store";

const products = [
  {
    id: 1,
    name: "PURE COTTON T-SHIRT",
    imageUrl: product1Image,
    price: 48.0,
  },
  {
    id: 2,
    name: "OVERSIZED TEE - PEARL PINK",
    imageUrl: product2Image,
    price: 40.0,
  },
  {
    id: 3,
    name: "OVERSIZED TEE - BLACK",
    imageUrl: blackImage,
    price: 59.0,
  },
  {
    id: 4,
    name: "LOOSE FIT CREW-NECK T-SHIRT",
    imageUrl: lastImage,
    price: 75.0,
  },

  {
    id: 5,
    name: "FULL-SLEEVE HOODED T-SHIRT",
    imageUrl: product5Image,
    price: 79.0,
  },
  {
    id: 6,
    name: "STYLISH FIT HOODIE FOR MEN",
    imageUrl: product6Image,
    price: 50.0,
  },
  {
    id: 7,
    name: "MEN FULL SLEEVE SWEATSHIRT",
    imageUrl: product8Image,
    price: 40.0,
  },
  {
    id: 8,
    name: "BONO - PLAIN MEN'S HOODIE",
    imageUrl: product7Image,
    price: 60.0,
  },
];

const App: React.FC = () => {

  const dispatch = useDispatch()

  const {userId , accessToken} = useSelector((state : RootState) => state.user?.currentUser)

  const {cartList } = useSelector((state : RootState) => state.cart )

  useEffect(()=>{

    if(userId && cartList.length == 0){
         axios.get(`${BASE_URL}/cart/getUserCart?userId=${userId}`)
                 .then((response : any) => {
                  dispatch(setCartList({products :  response.data.products , userId }))
          })
          .catch((error : any) => {
            console.error('Error:', error);
            alert('Your Internet Connection Is Not Good.')
          });
        }
   },[])


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

      <CartDrawer      />
    </Router>
    )
};

export default App;
