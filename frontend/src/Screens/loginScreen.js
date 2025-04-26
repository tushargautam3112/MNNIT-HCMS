import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import logo192 from "../assets/complaintLogo.jpg";
import UseMediaQuery from "../utils/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [width] = UseMediaQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userRole === "admin") {
        navigate("/admin/ServicesScreen");
      } else {
        navigate("/resident/homePage");
      }
    }
  }, [navigate, userInfo]);

  const handleChange = e => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(inputs.email, inputs.password));
  };

  const togglePasswordVisibility = () => {
    setInputs(prev => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  return (
    <div style={{ backgroundColor: "#D2FAFA", height: "100vh" }}>
      {error && <Message severity="error" message={error} open={true} />}
      <Grid container>
        <Grid item md={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={400}
              alignItems="center"
              justifyContent="center"
              margin="auto"
              marginTop={width > 1000 ? "12%" : "20%"}
              padding={5}
              borderRadius={2}
              bgcolor="white"
              sx={{
                  boxShadow: "4px 4px 8px #666/20",
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                paddingBottom={2}
                sx={{
                  color: "#3f51b5",
                  fontWeight: 600,
                }}
              >
                Welcome Back
              </Typography>

              <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  label="Email"
                />
              </FormControl>

              <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={inputs.showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={handleChange}
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#095fc5"
                }}
              >
                {loading && <Loader />} Login
              </Button>

              <Typography mt={2} fontSize={14}>
                <Link to="/signup" style={{ color: "#3f51b5" }}>
                  Don’t have an account? <b>SIGN UP</b>
                </Link>
              </Typography>
            </Box>
          </form>
        </Grid>

        {width > 1000 && (
          <Grid item md={6}>
            <img
              src={logo192}
              alt="logo"
              style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default LoginScreen;
