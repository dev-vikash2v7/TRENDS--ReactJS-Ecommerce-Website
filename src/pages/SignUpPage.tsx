import React,{useState} from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import backgroundImage from "../assets/images/background-image.jpg"; // Adjust the relative path as needed
import axios from "axios";
import { BASE_URL } from "../config";

const SignUpPage: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      console.log("Please fill in all the fields.");
      return;
    }
    const userData = {
      email,
      password,
    };

    axios
      .post(`${BASE_URL}/user/register`, userData)
      .then((response) => {

        window.location.href = "/login";
      })
      .catch((error) => {
        console.error(error);
        console.log("Failed to create an account. Please try again.");
      });
  };

  return (
    <>
      {/* <Header /> */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
            boxShadow: 5,
            width: "30%",
            maxWidth: "600px", // Adjust the width as needed
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Create An Account
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Social title</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Mr" control={<Radio />} label="Mr." />
                <FormControlLabel
                  value="Mrs"
                  control={<Radio />}
                  label="Mrs."
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mb: 1 }}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              sx={{ mb: 1 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="birthdate"
              label="Birthdate"
              name="birthdate"
              type="date"
              sx={{ mb: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Receive offers from our partners"
            />
            <FormControlLabel
              control={<Checkbox value="subscribeNewsletter" color="primary" />}
              label="Sign up for our newsletter"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Save
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in instead!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default SignUpPage;
