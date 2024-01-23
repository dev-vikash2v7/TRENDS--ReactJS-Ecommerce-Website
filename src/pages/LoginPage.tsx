import React,{useState} from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import backgroundImage from "../assets/images/background-image.jpg";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../config";

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = {
      email: username,
      password: password,
    };
    axios
      .post(`${BASE_URL}/admin/login`, userData)
      .then((response) => {
        const { accessToken, refreshToken} = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login error:", error);
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
            maxWidth: "400px", // Adjust the width as needed
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Log In To Your Account
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ mb: 1 }}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ mb: 1 }}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2" sx={{ mb: 1 }}>
            Forgot your password?
          </Link>
          <Typography variant="body2">
            No account?{" "}
            <Link href="/signup" variant="body2">
              Create one here
            </Link>
          </Typography>
        </Container>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default LoginPage;
