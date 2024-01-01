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

const Header: React.FC = () => {
  // Dummy count for cart items
  const cartItemCount = 0;

  return (
    <AppBar position="static" sx={{ background: "white", color: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ZÜREA
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" sx={{ color: "black" }}>
            <Search />
          </IconButton>
          <IconButton color="inherit" sx={{ color: "black" }}>
            <AccountCircle />
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            sx={{ color: "black" }}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
            Cart - {cartItemCount}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
