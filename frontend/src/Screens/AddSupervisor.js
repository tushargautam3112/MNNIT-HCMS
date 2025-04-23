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
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { registerSupervisor } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

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

const AddSupervisor = () => {
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

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      setSuccess(true);
      navigate("/admin/homePage");
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
        inputs.superVisor
      )
    );
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      superVisor: "",
      userRole: "supervisor",
    });
  };

  return (
    <div css={pageWrapper}>
      <AdminMenu />
      {loading && <CircularProgress />}
      {success && <Message severity="success" message="Supervisor Added!" open={true} />}
      {message && <Message severity="error" message={message} open={true} />}
      {error && <Message severity="error" message={error} open={true} />}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box css={formContainer}>
            <Typography variant="h4" align="center" sx={{ mb: 3, color: "#3f51b5", fontWeight: 600 }}>
              Register Supervisor
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <OutlinedInput
                      id="phoneNumber"
                      name="phoneNumber"
                      value={inputs.phoneNumber}
                      onChange={handleChange}
                      label="Phone Number"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                      id="address"
                      name="address"
                      value={inputs.address}
                      onChange={handleChange}
                      label="Address"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                      label="Email"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="superVisor">Supervisor Role</InputLabel>
                    <Select
                      id="superVisor"
                      name="superVisor"
                      value={inputs.superVisor}
                      onChange={handleChange}
                      label="Supervisor Role"
                    >
                      <MenuItem value="supervisor">Caretaker</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    Register
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
