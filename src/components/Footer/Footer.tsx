import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
// import VisaIcon from "../../assets/images/visa.png";
// import MastercardIcon from "../../assets/images/american_express.png";
// import PaypalIcon from "../../assets/images/paypal.png";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "black", color: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={6} sm={3}>
            <Typography variant="h6">Products</Typography>
            <Link href="#" color="inherit">
              Delivery
            </Link>
            {/* Add other links here */}
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6">Our Company</Typography>
            <Link href="#" color="inherit">
              Delivery
            </Link>
            {/* Add other links here */}
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6">Information</Typography>
            <Link href="#" color="inherit">
              Fashion Store
            </Link>
            {/* Add other links here */}
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6">Account</Typography>
            <Link href="#" color="inherit">
              Personal Info
            </Link>
            {/* Add other links here */}
          </Grid>
        </Grid>
        {/* <Box mt={5} display="flex" justifyContent="center">
          <VisaIcon />
          <MastercardIcon />
          <PaypalIcon />
        </Box> */}
        <Typography variant="body2" color="grey.A700" align="center" mt={2}>
          © {new Date().getFullYear()} E-commerce Software by Prestashop™
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
