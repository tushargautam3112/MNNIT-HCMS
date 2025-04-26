// import React from "react";
// import {
//   Button,
//   Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Divider
// } from "@mui/material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Grid from "@mui/material/Grid";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import FormControl from '@mui/material/FormControl';
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { updateUserDetails, getUserDetails } from "../actions/userActions";
// import Announcement from "../components/Announcement";
// import { getAllAnnouncements } from "../actions/announcementActions";
// import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
// import RegisterComplaint from "../components/RegisterComplaint";
// import Header from '../components/header.js'

// const ResidentScreen = () => {

//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [address, setAddress] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState("")
//   const [showConfirmPassword, setShowConfirmPassword] = useState("")
//   const [message, setMessage] = useState("")

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   const updateUserProfile = useSelector(state => state.updateUserProfile)
//   const { loading, success } = updateUserProfile

//   const userDetails = useSelector(state => state.userDetails)
//   const { user } = userDetails

//   const Announcements = useSelector(state => state.getAllAnnouncements)
//   const { announcements } = Announcements

//   useEffect(() => {
//     if (!userInfo)
//       navigate('/login')
//     else if (!user.email) {
//       dispatch(getUserDetails())
//     } else {
//       setFirstName(user.firstName)
//       setLastName(user.lastName)
//       setPhoneNumber(user.phoneNumber)
//       setAddress(user.address)
//       setEmail(user.email)
//     }
//   }, [userInfo, navigate, user, dispatch])

//   useEffect(() => {
//     if (!announcements) {
//       dispatch(getAllAnnouncements())
//     }
//   }, [announcements, dispatch])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (password !== confirmPassword)
//       setMessage("Passwords don't Match!!")
//     else {
//       dispatch(updateUserDetails({ phoneNumber, address, password }))
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(prevShowPassword => !prevShowPassword)
//   };

//   const handleClickShowConfirmPassword = () => {
//     setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword)
//   };

//   const handlePreviousComplaints = () => {
//     navigate('/resident/complaints',{state:{ st:true}})
//   }

//   return (
//     <div>
//       <Header />
      
//     </div>
//   );
// };

// export default ResidentScreen;





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

const ResidentScreen = () => {
  
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateUserProfile = useSelector((state) => state.updateUserProfile);
  const { loading, success } = updateUserProfile;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const Announcements = useSelector((state) => state.getAllAnnouncements);
  const { announcements } = Announcements;

  useEffect(() => {
    if (!userInfo) navigate("/login");
    else if (!user.email) {
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
    if (password !== confirmPassword) setMessage("Passwords don't Match!!");
    else {
      dispatch(updateUserDetails({ phoneNumber, address, password }));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handlePreviousComplaints = () => {
    navigate("/resident/complaints", { state: { st: true } });
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5} md={6} lg={4}>
          {/* Left Side */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 32}}>
            {/* <AccountCircleIcon sx={{ fontSize: 64,color: 'green', mr: 2 }} /> */}
            <Box>
              <Typography variant="h3" sx={{ color: 'green' }}>Welcome </Typography>
              <Typography variant="h4" sx={{backgroundColor: 'green', padding: '6px', color: 'white', display:"inline"}}>{`${user.firstName} ${user.lastName}`}</Typography>
              <Typography variant="h5" sx={{ color: 'green', marginTop:"10px" }}>to Hostel Complaint Management System of MNNIT</Typography>

              
              {/* <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">{user.phoneNumber}</Typography>
              <Typography variant="body2">{user.address}</Typography> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} md={6} lg={4} sx={{marginTop: 20}}>
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

export default ResidentScreen;
