import React from "react";
import {
  Button,
  Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Divider
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateUserDetails, getUserDetails } from "../actions/userActions";
import Announcement from "../components/Announcement";
import { getAllAnnouncements } from "../actions/announcementActions";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import RegisterComplaint from "../components/RegisterComplaint";
import Header from '../components/header.js';
import Box from "@mui/material/Box";

import logo192 from "../assets/student.jpg";
const UpdateProfileScreen = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const updateUserProfile = useSelector(state => state.updateUserProfile)
  const { loading, success } = updateUserProfile

  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  const Announcements = useSelector(state => state.getAllAnnouncements)
  const { announcements } = Announcements

  useEffect(() => {
    if (!userInfo)
      navigate('/login')
    else if (!user.email) {
      dispatch(getUserDetails())
    } else {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setPhoneNumber(user.phoneNumber)
      setAddress(user.address)
      setEmail(user.email)
    }
  }, [userInfo, navigate, user, dispatch])

  useEffect(() => {
    if (!announcements) {
      dispatch(getAllAnnouncements())
    }
  }, [announcements, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      setMessage("Passwords don't Match!!")
    else {
      dispatch(updateUserDetails({ phoneNumber, address, password }))
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword)
  };

  const handlePreviousComplaints = () => {
    navigate('/resident/complaints',{state:{ st:true}})
  }

  return (
    <div>
      <Header />
      
      {message && <Message severity="error" message={message} open={true} />}
      {success && <Message severity="success" message="Profile Updated" open={true} />}
      <Grid container direction="row" spacing={2}>
        <Grid item xs md={4.5} sx={{ textAlign: "center", margin: "6% 2% 0 2%" }}>
        <Box border={1} borderRadius={4} borderColor={'green'} p={2}>
          <div>
            <AccountCircleIcon fontSize="large" />
          </div>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              textAlign={"center"}
              padding={1}
              sx={{
                color: "#283593",
                fontFamily: "Arizonia",
                marginBottom: 0,
                marginTop: "1px",
              }}
            >
              PROFILE
            </Typography>

            <Grid container spacing={.5} style={{ marginTop: "5px" }}>
              <Grid item md={6}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <OutlinedInput
                    id="firstName"
                    value={firstName}
                    disabled
                    inputProps={{ "aria-label": "firstName" }}
                    label="firstName"
                    name="firstName"
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <OutlinedInput
                    id="lastName"
                    value={lastName}
                    disabled
                    inputProps={{ "aria-label": "lastName" }}
                    label="lastName"
                    name="lastName"
                  />
                </FormControl>
              </Grid>

              <FormControl
                sx={{ width: "100%", marginTop: "3%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <OutlinedInput
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  inputProps={{ "aria-label": "phoneNumber" }}
                  label="phoneNumber"
                  name="phoneNumber"
                />
              </FormControl>
              <FormControl
                sx={{ width: "100%", marginTop: "3%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="address">Address</InputLabel>
                <OutlinedInput
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  inputProps={{ "aria-label": "address" }}
                  label="address"
                  name="address"
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%", marginTop: "3%" }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={email}
                  disabled
                  inputProps={{ "aria-label": "email" }}
                  label="email"
                  name="email"
                />
              </FormControl>
              <Grid container spacing={1} sx={{ marginTop: "1%" }}>
                <Grid item md={6}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      value={password}
                      required={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
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
                </Grid>
                <Grid item md={6}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-Confirmpassword">
                      Cnfm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-Confirmpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={e => setConfirmPassword(e.target.value)}
                      name="confirmPassword"
                      value={confirmPassword}
                      required={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="confirmPassword"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained" color="success"
                sx={{
                  margin: "5%",
                  width: "100%",
                }}
              >
                {loading && <Loader />}Update Information
              </Button>
            </Grid>
          </form>
        
          </Box>
        </Grid>
      


        <Grid item xs={12} md={6}>
          {/* Right Side: Image */}
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end" height="100%">
            <img src={logo192} alt="Profile" style={{ width: "50%" }} />
          </Box>
        </Grid>

      </Grid>
    </div>
  );
};

export default UpdateProfileScreen;








