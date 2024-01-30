import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { ShoppingCart, Search, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setCartVisible } from "../../Redux/Slices/cart.slice";

const Header: React.FC = () => {
  const cartItemCount = 0;
  const dispatch = useDispatch()

  return (
    <AppBar position="static" sx={{ background: "white", color: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ZÜREA
          </Typography>
        </Box>
        <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: "black" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/shoes"
            sx={{ color: "black" }}
          >
            Shoes
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/watch"
            sx={{ color: "black" }}
          >
            Watch
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/more"
            sx={{ color: "black" }}
          >
            More
          </Button>
        </Box>
        
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton color="inherit" sx={{ color: "black" }}>
            <Search />
          </IconButton>
          <IconButton color="inherit" sx={{ color: "black" }}>
            <AccountCircle />
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="#"
            sx={{ color: "black" }}
            onClick={ ()=> dispatch(setCartVisible(true))}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>

          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
