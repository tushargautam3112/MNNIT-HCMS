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
    <div>
      <AdminMenu />
      {loading && <Loader />}
      {success && <Message severity="success" message="Supervisor Added" open={true}/>}
      <Grid
        container
        spacing={2}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0,
          width: { sm: "calc(100% - 240px)" },
          margin: "0 0 0 17%",
        }}
        justify-content="center"
        align-items="center"
      >
        <Grid item>
          {message && (
            <Message severity="error" message={message} open={true} />
          )}
          {error && <Message severity="error" message={error} open={true} />}
          <div>
            <Grid container>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={0}
                    padding={5}
                    pt={1}
                    borderRadius={5}
                    style={{ backgroundColor: "white", height: 500 }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      padding={1}
                      sx={{
                        color: "#283593",
                        fontFamily: "Arizonia",
                        marginTop: "1px",
                      }}
                    >
                      Add workers
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: "1%" }}>
                      <Grid item md={6}>
                        <FormControl
                          item
                          sx={{ width: 215 }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="firstName">
                            First Name
                          </InputLabel>
                          <OutlinedInput
                            id="firstName"
                            value={inputs.firstName}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "firstName" }}
                            label="firstName"
                            name="firstName"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <FormControl sx={{ width: 210 }} variant="outlined">
                          <InputLabel htmlFor="lastName">Last Name</InputLabel>
                          <OutlinedInput
                            id="lastName"
                            value={inputs.lastName}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "lastName" }}
                            label="lastName"
                            name="lastName"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl
                      sx={{ width: "99%", marginTop: "2%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="phoneNumber">
                        Phone Number
                      </InputLabel>
                      <OutlinedInput
                        id="phoneNumber"
                        value={inputs.phoneNumber}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "phoneNumber" }}
                        label="phoneNumber"
                        name="phoneNumber"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "99%", marginTop: "2%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="address">Address</InputLabel>
                      <OutlinedInput
                        id="address"
                        value={inputs.address}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "address" }}
                        label="address"
                        name="address"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ width: "99%", marginTop: "2%" }}
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
                    <FormControl
                      sx={{ width: "99%", marginTop: "2%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="userRole">Worker Role</InputLabel>
                      <Select
                        id="userRole"
                        value={inputs.userRole}
                        onChange={handleChange}
                        label="userRole"
                        name="userRole"
                      >
                        <MenuItem value="plumber">Plumber</MenuItem>
                        <MenuItem value="electrician">Electrician</MenuItem>
                        <MenuItem value="carpenter">Carpenter</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ width: "99%", marginTop: "2%" }}
                    >
                      {loading && <Loader />}Register
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6}>
          <Grid container direction="row">
            {/* {services && services.map(service => (<Grid item md={12} key={service.slug}>
                            <Service serviceData={service} refresh={handleRefreshServices} />
                        </Grid>))} */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddSupervisor;
