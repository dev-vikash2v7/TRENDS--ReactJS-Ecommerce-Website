// ProductDetailsPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  TextField,
  Divider,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import ZoomPopup from "../../components/ZoomPopup/ZoomPopup";
import product1Image from "../../assets/images/product1.jpg";
import product2Image from "../../assets/images/product2.jpg";
import product24Image from "../../assets/images/product-2-4.jpg";
import product26Image from "../../assets/images/product-2-6.jpg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ICart, ICartItem, IProduct } from "../../types/types";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { addItemToCart, setCartVisible, updateQuantity } from "../../Redux/Slices/cart.slice";


const ProductDetailsPage = ({products}:any) => {

  
  const [selectedImage, setSelectedImage] = useState(product1Image);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();


  const [isAdded, setIsAdded] = useState<boolean>(false);
  
  const { productId } = useParams<{ productId: string }>();

  const numericProductId = productId ? parseInt(productId, 10) : undefined;

  const {cartList } = useSelector((state : RootState) => state.cart )  
  
  const cartProduct : ICartItem  = numericProductId !== undefined
  ? products.find((p:any) => p.id === numericProductId)
  : undefined;
  
  const product: IProduct = {
    id: cartProduct.id,
    name: cartProduct.name,
    rating: 4,
    reviewCount: 89,
    price: cartProduct.price,
    originalPrice: 60.0,
    stock: 5,
    delivery: "2-3 Days",
    images: [cartProduct.imageUrl, product24Image, product26Image],
    colors: ["#f4ecc2"],
    sizes: ["S", "M", "L", "XL"],
  };
  
  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
    if (newSize) {
      setSelectedSize(newSize);
    }
  };

  const handleSelectImage = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const toggleZoom = () => {
    setIsZoomOpen(!isZoomOpen);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  
  useEffect(()=>{ 

    cartList.map((item : ICartItem) =>{
                 if(item.id == product.id){
                   setIsAdded(true);
                   setQuantity(item.quantity)
                   return
                 }
             })
      

   },[])


  const handleAddToCart = () => {

    if(!isAdded ){
     setIsAdded(true)
     dispatch( addItemToCart( {...cartProduct , quantity : quantity == 0 ? 1 : quantity} ) )
    }
    else{
        dispatch(updateQuantity({productId : cartProduct.id, newQuantity : quantity}));
    }
    dispatch(setCartVisible(true));
  };

  
  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", padding: 4, justifyContent: "center", gap: 4 }}
      >
        <Box sx={{ flex: 2, maxWidth: "50%" }}>
          <ImageGallery
            images={product.images}
            onSelectImage={handleSelectImage}
          />
        </Box>
        <Box sx={{ flex: 1, maxWidth: "30%" }}>
          <Typography variant="h4">{product.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating name="read-only" value={product.rating} readOnly />
            <Typography>({product.reviewCount} Reviews)</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              ${product.price.toFixed(2)}
            </Typography>


            <Typography sx={{ color: "text.secondary" }}>
              Save{" "}
              {(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                100
              ).toFixed(2)}

              % (${(product.originalPrice - product.price).toFixed(2)})


            </Typography>
          </Box>
          <Typography variant="subtitle1">
            {product.stock > 0
              ? `${product.stock} left in stock - Delivery in ${product.delivery}`
              : "Out of stock"}
          </Typography>

          {/* Color options */}
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 1 }}
          >
            Color: <Box component="span">Beige</Box>
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {product.colors.map((color) => (
              <Box
                key={color}
                sx={{
                  bgcolor: color,
                  width: 24,
                  height: 24,
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  cursor: "pointer",
                  "&:hover": {
                    border: "2px solid #1976d2", // change color as per your theme
                  },
                }}
              />
            ))}
          </Box>

          {/* Size options */}
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 1 }}
          >
            Size : S
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            sx={{
              my: 2,
              ".MuiToggleButtonGroup-grouped": {
                border: 0,
                "&:not(:first-of-type)": {
                  borderRadius: "4px",
                },
                "&:first-of-type": {
                  borderRadius: "4px",
                },
                "&.Mui-selected": {
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  border: "1px solid black",
                },
              },
            }}
          >
            {product.sizes.map((size) => (
              <ToggleButton
                key={size}
                value={size}
                sx={{
                  width: 100,
                  marginRight: 5,
                }}
              >
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider sx={{ my: 2 }} />

          {/* Quantity selector */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ minWidth: "fit-content", mr: 2 }}
            >
              Quantity ({quantity} in cart)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handleDecrement}
                size="small"
                sx={{ border: "1px solid rgba(0, 0, 0, 0.23)" }}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                variant="outlined"
                sx={{
                  maxWidth: "60px",
                  ".MuiInputBase-input": {
                    textAlign: "center",
                    padding: "10px",
                  },
                  ".MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                  },
                }}
              />
              <IconButton
                onClick={handleIncrement}
                size="small"
                sx={{ border: "1px solid rgba(0, 0, 0, 0.23)" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            
            <Button
              onClick={() => handleAddToCart()}
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              sx={{ flexGrow: 1, borderColor: "black", color: "black" }}
            >
             {!isAdded ? 'ADD TO CART' : 'View Cart'}
            </Button>

            <Button
              variant="contained"
              sx={{ flexGrow: 1, bgcolor: "black", color: "white" }}
            >
              BUY IT NOW
            </Button>
          </Stack>
        </Box>
        {isZoomOpen && <ZoomPopup image={selectedImage} onClose={toggleZoom} />}
      </Box>

      <Box
        sx={{
          width: "100%",
          typography: "body1",
          border: "1px solid #e0e0e0",
          m: 5, // Add margin top for spacing from the previous content
          borderRadius: "4px", // Optional: if you want rounded corners
          mb: 8,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="product details tabs"
        >
          <Tab label="DESCRIPTION" />
          <Tab label="ADDITIONAL INFORMATION" />
          <Tab label="SHIPPING AND DELIVERY" />
        </Tabs>
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 2 }}>
          <Typography>
            {/* Content for DESCRIPTION */}
            This product is made of high-quality materials. It features a
            classic design with attention to detail...
          </Typography>
        </Box>
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 2 }}>
          <Typography>
            {/* Content for ADDITIONAL INFORMATION */}
            Dimensions: 10x10x5 inches. Material: 100% cotton. Care
            instructions: Machine washable...
          </Typography>
        </Box>
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ p: 2 }}>
          <Typography>
            {/* Content for SHIPPING AND DELIVERY */}
            Standard delivery: 3-5 business days. Expedited delivery: 1-2
            business days. All orders are processed within 24 hours...
          </Typography>
        </Box>
      </Box>


      <CartDrawer
       setQuantity={setQuantity}
      />

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
