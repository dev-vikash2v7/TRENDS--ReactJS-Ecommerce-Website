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
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/user.slice";

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleLogin = () => {

    const userData = {
      email: username,
      password: password,
    };

    try{

      
      axios.post(`${BASE_URL}/user/login`, userData)
      .then((response) => {

        const { accessToken, refreshToken ,userDetails} = response.data;

        dispatch(setUser({
          userId :  userDetails._id ,
          email : userDetails.email  ,
          accessToken,
           refreshToken
          } ))
          
          window.location.href = "/";
        })
      .catch((error) => {
        console.error("Login error:", error);
      });
    }
    catch(error) {
      console.error("Login error:", error);
    }
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
