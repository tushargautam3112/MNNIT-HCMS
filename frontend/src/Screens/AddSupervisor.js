import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  Button,
  Typography,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminMenu from "../components/adminMenu";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { registerSupervisor } from "../actions/userActions";
import UseMediaQuery from "../utils/useMediaQuery";

const AddSupervisor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [width] = UseMediaQuery();

  const { loading, error, userInfo } = useSelector((state) => state.userRegister);
  const [success, setSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    superVisor: "",
    userRole: "supervisor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "phoneNumber" && { password: value }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerSupervisor(
      inputs.firstName,
      inputs.lastName,
      inputs.phoneNumber,
      inputs.address,
      inputs.email,
      inputs.userRole,
      inputs.superVisor,
      inputs.password
    ));
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      superVisor: "",
      userRole: "supervisor",
    });
    setSuccess(true);
  };

  useEffect(() => {
    if (userInfo) {
      setSuccess(true);
      navigate("/resident/homePage");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <AdminMenu />
      {loading && <Loader />}
      {success && <Message severity="success" message="Supervisor Registered!" open />}
      {error && <Message severity="error" message={error} open />}
      <Grid
        container
        justifyContent="center"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0,
          width: { sm: "calc(100% - 240px)" },
          margin: "0 0 0 17%",
        }}
      >
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin="auto"
              padding={5}
              pt={1}
              borderRadius={5}
              sx={{ backgroundColor: "white", height: 500 }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                padding={1}
                sx={{
                  color: "#283593",
                  fontFamily: "Arizonia",
                }}
              >
                Register Supervisor
              </Typography>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <OutlinedInput
                      id="firstName"
                      name="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                      label="First Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <OutlinedInput
                      id="lastName"
                      name="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                      label="Last Name"
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <OutlinedInput
                  id="phoneNumber"
                  name="phoneNumber"
                  value={inputs.phoneNumber}
                  onChange={handleChange}
                  label="Phone Number"
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <OutlinedInput
                  id="address"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  label="Address"
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  label="Email"
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel htmlFor="superVisor">Supervisor Role</InputLabel>
                <Select
                  id="superVisor"
                  name="superVisor"
                  value={inputs.superVisor}
                  onChange={handleChange}
                  label="Supervisor Role"
                >
                  <MenuItem value="plumber">Civil</MenuItem>
                  <MenuItem value="electrician">Electrical</MenuItem>
                  <MenuItem value="carpenter">Carpenter</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? <Loader /> : "Register"}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddSupervisor;
