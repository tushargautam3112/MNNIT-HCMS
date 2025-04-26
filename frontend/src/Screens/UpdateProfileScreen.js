import React, { useState, useEffect } from "react";
import {
  Grid, Box, Typography, Button, InputLabel, OutlinedInput,
  FormControl, InputAdornment, IconButton, Divider
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/header";

import { updateUserDetails, getUserDetails } from "../actions/userActions";
import { getAllAnnouncements } from "../actions/announcementActions";

import logo192 from "../assets/student.jpg";

const UpdateProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, success } = useSelector(state => state.updateUserProfile);
  const { user } = useSelector(state => state.userDetails);
  const { announcements } = useSelector(state => state.getAllAnnouncements);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!user.email) {
      dispatch(getUserDetails());
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setEmail(user.email);
    }
  }, [userInfo, navigate, user, dispatch]);

  useEffect(() => {
    if (!announcements) {
      dispatch(getAllAnnouncements());
    }
  }, [announcements, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
    } else {
      dispatch(updateUserDetails({ phoneNumber, address, password }));
    }
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  return (
    <>
      <Header />

      {message && <Message severity="error" message={message} open />}
      {success && <Message severity="success" message="Profile Updated" open />}

      <Grid container sx={{ padding: 2 }}>
        {/* Left Side Form */}
        <Grid item xs={12} md={4} mt={12} ml={14}>
          <Box border={1} borderColor="green" borderRadius={4} p={3}>
            <Box textAlign="center" mb={2}>
              <AccountCircleIcon fontSize="large" />
              <Typography
                variant="h5"
                sx={{ color: "#283593", fontFamily: "Arizonia", mt: 1 }}
              >
                PROFILE
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput value={firstName} disabled label="First Name" />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput value={lastName} disabled label="Last Name" />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      label="Phone Number"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Address</InputLabel>
                    <OutlinedInput
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Address"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput value={email} disabled label="Email" />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                    {loading && <Loader />}
                    Update Information
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>

        {/* Right Side Image */}
        <Grid item xs={12} md={7} display="flex" justifyContent="center" alignItems="center">
          <Box>
            <img src={logo192} alt="Profile" style={{ width: "100%", maxWidth: "700px" }} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateProfileScreen;
