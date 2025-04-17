import React from "react";
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
import { useState, useEffect } from "react"; //these are hooks
import { Link } from "react-router-dom";
import logo192 from "../assets/complaintLogo.jpg";
import UseMediaQuery from "../utils/useMediaQuery";
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

//hooks are functions that allow functional components to manage state, perform side effects, and access lifecycle methods. 

const LoginScreen = () => {
  //Hooks can only be called inside React function components.
  //Hooks can only be called at the top level of a component.

  //here inputs are the state variable and setInputs is the function
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    showPassword: ""
  });
  const [width] = UseMediaQuery();
  const handleChange = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, userInfo, error } = useSelector(state => state.userLogin)

  // useEffect(() => {
  //   if (userInfo) navigate("/resident/homePage");
  // }, [navigate, userInfo]);

  
  useEffect(() => {
    if (userInfo) {
      // Check if the user is an admin or not
      if (userInfo.userRole === "admin") {
        navigate("/admin/AssignPending"); // Navigate to admin dashboard
      } else {
        navigate("/resident/homePage"); // Navigate to user's home page
      }
    }
  }, [navigate, userInfo]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      login(inputs.email, inputs.password)
    )
  };
  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };
  return (
    <div style={{ backgroundColor: "rgb(150 195 154)", margin: 0, height: "100vh" }}>
      {error && <Message severity="error" message={error} open={true} />}
      <Grid container>
        <Grid item md={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={400}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={"16%"}
              padding={5}
              borderRadius={2}
              style={{ backgroundColor: "white" }}
              //boxShadow={"5px 5px 10px #ccc"}
              sx={{
                ":hover": {
                  boxShadow: "4px 4px 8px #ccc",
                },
              }}
            >
              <Typography
                variant="h4"
                textAlign={"center"}
                padding={2}
                sx={{
                  color: "#283593",
                  fontFamily: "Arizonia",
                  marginBottom: 0,
                  marginTop: "2px",
                }}
              >
                Welcome Back
              </Typography>
              <FormControl
                sx={{ width: "99%", marginTop: "1%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={inputs.email}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "email" }}
                  label="email"
                  name="email"
                />
              </FormControl>

              <FormControl sx={{ width: "99%", marginTop: "2%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={inputs.showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  value={inputs.password}
                  required={true}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {inputs.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                type="submit"
                sx={{
                  marginTop: "3%",
                  backgroundColor: "#557d45",
                  width: "97%",
                  padding: 1,
                  color: "white",
                  ":hover": {
                    boxShadow: "1px 1px 2px #388e3c",
                    backgroundColor: "#396029",
                  },
                }}
              >
                {loading && <Loader />}Login
              </Button>
              <Grid
                container
                style={{ marginTop: "0px", border: "0px", boxShadow: 0 }}
                sx={{ boxShadow: 0 }}
              >
                <Grid item xs={6}></Grid>
                {/* <Grid item xs={6} sx={{boxShadow:0}}> 
            <item>
                
                <Link to="/forgotpass">
                    forgot Password?
                </Link>
                
            </item>
           
        </Grid>
*/}
              </Grid>

              <p className="text-left">
                <Link to="/signup">
                  Don't have an account? <b>SIGNUP</b>
                </Link>
              </p>
            </Box>
          </form>
        </Grid>
        {width > 1000 && (
          <Grid item md={6}>
            <img
              src={logo192}
              alt="logo"
              style={{ width: "100%", height: "99.4vh" }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default LoginScreen;
