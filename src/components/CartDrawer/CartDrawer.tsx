import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ICartItem } from "../../types/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import { BASE_URL } from "../../config";
import demoImage from "../../assets/images/product-2-6.jpg"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { json } from "stream/consumers";
import { setCartList } from "../../Redux/Slices/cart.slice";

interface ICartDrawerProps {
  cartVisible: boolean;
  setCartVisible: (visible: boolean) => void;
  cartItems: ICartItem[];
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  totalPrice : number
}




interface IcartUpatedItem{
  id: string;
  price: number;
  quantity: number;
  name: string;
  images : string
}


const CartDrawer: React.FC<ICartDrawerProps> = ({
  cartVisible,
  setCartVisible,
  cartItems,
  updateCartItemQuantity,
  totalPrice
}) => {
  

  const imageSize = {
    width: 100,
    height: 100,
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCheckout = () => {
    // Handle the checkout action
    // localStorage.setItem('amount' , totalPrice.toString())

    dispatch(setCartList( {cartList : cartItems, totalPrice , cartVisible : false}))
    navigate(`/checkout` );

  };


  return (
    <Drawer
      anchor="right"
      open={cartVisible}
      onClose={() => setCartVisible(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: 350,
          padding: 2,
        }}
        role="presentation"
      >
        <IconButton
          onClick={() => setCartVisible(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Your Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
          <List>

            {cartItems && cartItems?.map((item) => (

              <ListItem key={item.id}>
                <CardMedia
                  component="img"
                  image={item.imageUrl}
                  alt={item.name}
                  sx={{
                    width: imageSize.width,
                    height: imageSize.height,
                    objectFit: "cover",
                    mr: 2,
                  }}
                />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="subtitle1">
                    {item.name}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value)
                        )
                      }
                      inputProps={{ style: { textAlign: "center" }, min: 1 }}
                      sx={{ maxWidth: 40, mx: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Estimated total
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            {/* ${totalPrice.toFixed(2)} USD */}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Taxes, discounts, and shipping calculated at checkout
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
          >
            CHECK OUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
