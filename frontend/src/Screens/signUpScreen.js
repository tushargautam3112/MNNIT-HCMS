import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo192 from "../assets/complaintLogo.jpg";
import UseMediaQuery from "../utils/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/userActions.js";
import Header from "../components/header";


const SignUpScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const navigate = useNavigate();

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) navigate("/resident/homePage");
  }, [navigate, userInfo]);

  const [width] = UseMediaQuery();

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setInputs({
      ...inputs,
      showConfirmPassword: !inputs.showConfirmPassword,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword)
      setMessage("Passwords don't match");
    else {
      dispatch(
        register(
          inputs.firstName,
          inputs.lastName,
          inputs.phoneNumber,
          inputs.address,
          inputs.email,
          inputs.password
        )
      );
    }
  };

  return (
    <>
      <Header/>
      {message && <Message severity="error" message={message} open={true} />}
      {error && <Message severity="error" message={error} open={true} />}
      <div style={{ backgroundColor: "#D2FAFA", margin: 0, height: "100vh" }}>
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
                marginTop={width > 1000 ? "17%" : "20%"}
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
                  Sign Up
                </Typography>


                {/* First Name and Last Name in one row */}
                <Box display="flex" gap={2} width="100%" marginTop="1%">
                  <FormControl sx={{ flex: 1 }} variant="outlined">
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <OutlinedInput
                      id="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "firstName" }}
                      label="First Name"
                      name="firstName"
                    />
                  </FormControl>

                  <FormControl sx={{ flex: 1 }} variant="outlined">
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <OutlinedInput
                      id="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "lastName" }}
                      label="Last Name"
                      name="lastName"
                    />
                  </FormControl>
                </Box>

                {/* Other fields */}
                <FormControl sx={{ width: "100%", marginTop: "1%" }} variant="outlined">
                  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                  <OutlinedInput
                    id="phoneNumber"
                    value={inputs.phoneNumber}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "phoneNumber" }}
                    label="Phone Number"
                    name="phoneNumber"
                  />
                </FormControl>

                <FormControl sx={{ width: "100%", marginTop: "1%" }} variant="outlined">
                  <InputLabel htmlFor="address">Hostel</InputLabel>
                  <OutlinedInput
                    id="address"
                    value={inputs.address}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "address" }}
                    label="Address"
                    name="address"
                  />
                </FormControl>

                <FormControl sx={{ width: "100%", marginTop: "1%" }} variant="outlined">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    value={inputs.email}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "email" }}
                    label="Email"
                    name="email"
                  />
                </FormControl>

                {/* Password and Confirm Password in one row */}
                <Box display="flex" gap={2} width="100%" marginTop="1%">
                  <FormControl sx={{ flex: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={inputs.showPassword ? "text" : "password"}
                      onChange={handleChange}
                      name="password"
                      value={inputs.password}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  <FormControl sx={{ flex: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirm-password"
                      type={inputs.showConfirmPassword ? "text" : "password"}
                      onChange={handleChange}
                      name="confirmPassword"
                      value={inputs.confirmPassword}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {inputs.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                </Box>


                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ width: "99%", marginTop: "2%" }}
                >
                  {loading && <Loader />}SIGN UP
                </Button>

              
                <Typography mt={2} fontSize={14}>
                <Link to="/login" style={{ color: "#3f51b5" }}>
                  Already have an account? <b>Register</b>
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
    </>
  );
};

export default SignUpScreen;
