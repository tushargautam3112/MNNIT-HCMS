import React from "react";
import {
  Button,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Divider,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateUserDetails, getUserDetails } from "../actions/userActions";
import Announcement from "../components/Announcement";
import { getAllAnnouncements } from "../actions/announcementActions";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import RegisterComplaint from "../components/RegisterComplaint";
import Header from "../components/header.js";
import { green } from "@mui/material/colors";
import logo192 from "../assets/complain.jpg";
import { sx } from "@mui/system";
import logoImage from  "../assets/mnnitlogo.png"

const HomeScreen = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const Announcements = useSelector((state) => state.getAllAnnouncements);
  const { announcements } = Announcements;


  useEffect(() => {
    if (!announcements) {
      dispatch(getAllAnnouncements());
    }
  }, [announcements, dispatch]);

  return (
    <div>
        <Header/>
      <Grid container spacing={2} justifyContent="center" sx={{backgroundImage: logo192}}>
        
        <Grid item xs={5} md={2} lg={4}  sx={{marginTop: 28}}>
            
            
          {/* Left Side */}
          <img src={logoImage} width={300} alt='MNNIT'/>
          <Box sx={{ display: 'flex', alignItems: 'center',}}>
            {/* <AccountCircleIcon sx={{ fontSize: 64,color: 'green', mr: 2 }} /> */}
            <Box sx={{marginTop: "30px"}}>
              <Typography variant="h4" sx={{ color: 'green' }}>Welcome </Typography>
              {/* <Typography variant="h4" sx={{backgroundColor: 'green', padding: '6px', color: 'white', display:"inline"}}>{`${user.firstName} ${user.lastName}`</Typography> */}
              <Typography variant="h5" sx={{ color: 'green', marginTop:"10px" }}>to Hostel Complaint Management System of MNNIT</Typography>

              
              {/* <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">{user.phoneNumber}</Typography>
              <Typography variant="body2">{user.address}</Typography> */}
              {/* <img src={logo192} alt="Image Description" sx={{ width: "70%"}} /> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={4} sx={{marginTop: 20}}>
          {/* Right Side */}
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0047AB", mt:"20px", textAlign: "center", }}>
              Announcements
            </Typography>
          {announcements && announcements.map(announcement => <Announcement date={announcement.date.split("T")[0]} key={announcement._id}>{announcement.description}</Announcement>)}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeScreen;