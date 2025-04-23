import React, { useState, useEffect } from "react";
import AdminMenu from "../components/adminMenu";
import {
  Grid,
  Box,
  FormControl,
  Button,
  Typography,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createService, getAllServices } from "../actions/servicesActions";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../actions/userRoleActions";
import Service from "../components/Service";
import Loader from "../components/Loader";

import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo192 from "../assets/complaintLogo.jpg";
import UseMediaQuery from "../utils/useMediaQuery";

import Message from "../components/Message";
import { registerSupervisor } from "../actions/userActions.js";

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formContainer = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const pageWrapper = css`
  min-height: 100vh;
  background: #f0f4f8;
  padding-top: 2rem;
`;

const inputSpacing = { marginTop: "1rem" };


const AddSupervisor = () => {
  const Roles = useSelector((state) => state.getRoles);
  const { roles } = Roles;

  // const { loading, services } = useSelector(state => state.getAllServices)

  const { service } = useSelector((state) => state.createService);

  const [open, setOpen] = React.useState(false);
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const userLogin = useSelector((state) => state.userLogin);

  // const { userInfo } = userLogin
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const initialInputs = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    userRole: "",
    superVisor: "",
  };

  const [inputs, setInputs] = useState(initialInputs);
  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if(inputs.phoneNumber){
      setInputs((prevState) => ({
        ...prevState,
        'password': inputs.phoneNumber,
      }));
    }
  };

  useEffect(() => {
    if (userInfo) navigate("/resident/homePage");
  }, [navigate, userInfo]);

  const [width] = UseMediaQuery();

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        registerSupervisor(
          inputs.firstName,
          inputs.lastName,
          inputs.phoneNumber,
          inputs.address,
          inputs.email,
          inputs.userRole,
          inputs.superVisor,
          inputs.password
        )
      );
      setInputs(initialInputs);
      setSuccess(true);
  };

  return (
    <div css={pageWrapper}>
      <AdminMenu />
      {loading && <Loader />}
      {success && (
        <Message severity="success" message="Supervisor Added" open={true} />
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {message && (
            <Message severity="error" message={message} open={true} />
          )}
          {error && <Message severity="error" message={error} open={true} />}
  
          <Box css={formContainer}>
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 3, color: "#3f51b5", fontWeight: 600 }}
            >
              Add Worker
            </Typography>
  
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      name="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                      label="First Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                      name="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                      label="Last Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                      name="phoneNumber"
                      value={inputs.phoneNumber}
                      onChange={handleChange}
                      label="Phone Number"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Address</InputLabel>
                    <OutlinedInput
                      name="address"
                      value={inputs.address}
                      onChange={handleChange}
                      label="Address"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                      label="Email"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Worker Role</InputLabel>
                    <Select
                      name="userRole"
                      value={inputs.userRole}
                      onChange={handleChange}
                      label="Worker Role"
                    >
                      <MenuItem value="plumber">Plumber</MenuItem>
                      <MenuItem value="electrician">Electrician</MenuItem>
                      <MenuItem value="carpenter">Carpenter</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {loading && <Loader />} Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
  
};

export default AddSupervisor;
