import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../actions/userActions'
import { useDispatch,useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Select, MenuItem,FormControl,OutlinedInput,InputLabel } from '@mui/material';
import { useState,useEffect } from 'react';
import {createRecord} from '../actions/workerFormActions'
import Message from '../components/Message'
import { useNavigate, Link } from 'react-router-dom';
import { getRoles } from '../actions/userRoleActions'
import Announcement from "../components/Announcement";
import { getAllAnnouncements } from "../actions/announcementActions";
import logoImage from  "../assets/logoImage.png"



export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Roles = useSelector(state => state.getRoles)
  const { roles } = Roles

  useEffect(() => {
    if (!roles)
      dispatch(getRoles(['admin', 'resident']))
  },[])

  const handleLogOut = () => {
    navigate('/')
    dispatch(logout())
  }

  const [open, setOpen] = React.useState(false);

  const handleJoinUs = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [inputs, setInputs] = useState({
    profession: "",
    experience: "",
    referralID: ""

  })

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const {success,error} = useSelector(state => state.createRecord)
  const handleSubmit = () => {
    handleClose()
    dispatch(createRecord(inputs.profession,inputs.experience,inputs.referralID))
  }

  const navigateHomePage = () => {
    userInfo ? navigate('/resident/homePage') : navigate('/')
  }

  const handleAdminPage = () => {
    navigate('/admin/AssignPending')
  }

  const handleUpdateProfile = () => {
    navigate('/resident/UpdateProfile')
  }
  const handlePrevComplain = () => {
    navigate('/resident/complaints')
  }
  const Announcements = useSelector(state => state.getAllAnnouncements)
  const { announcements } = Announcements

  const customContentStyle = {
    width: '100%',
    maxWidth: '90%',
  };
  
  return (
    <div>
      {success && <Message severity="success" message="Record Submitted" open={true}/>}
      {error && <Message severity="error" message={error} open={true}/>}
      <Dialog open={open} contentstyle={customContentStyle}>
        {/* <DialogTitle>Announcement</DialogTitle> */}
        <DialogContent>
          {/* <FormControl sx={{ width: "99%", marginTop: "1%" }}
            variant="outlined">
            <InputLabel htmlFor="profession">Profession</InputLabel>
            <Select
              labelId="profession"
              id="profession"
              value={inputs.profession}
              label="Profession"
              onChange={handleChange}
              name="profession"
            >
              {roles && roles.map(role => (<MenuItem value={role.slug} key={role.slug}>{role.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "99%", marginTop: "2%" }} variant="outlined">
            <InputLabel htmlFor="Experience">Experience</InputLabel>
            <Select
              labelId="experience"
              id="experience"
              value={inputs.experience}
              label="Experience"
              onChange={handleChange}
              name="experience"
            >
              <MenuItem value="0-2yrs">0-2yrs</MenuItem>
              <MenuItem value="2-5yrs">2-5yrs</MenuItem>
              <MenuItem value=">5yrs">More than 5yrs</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "99%", marginTop: "2%" }} variant="outlined">
            <InputLabel htmlFor="Referral">Referral ID</InputLabel>
            <OutlinedInput
              id="referralID"
              value={inputs.referralID}
              onChange={handleChange}
              inputProps={{ "aria-label": "referralID" }}
              label="referralID"
              name="referralID"
            />
          </FormControl> */}
                    <Typography
            variant="h5"
            textAlign={"center"}
            padding={1}
            sx={{
              color: "#283593",
              marginBottom: 0,
              marginTop: "1px",
            }}
          >
            ANNOUNCEMENTS
          </Typography>
          {announcements && announcements.map(announcement => <Announcement date={announcement.date.split("T")[0]} key={announcement._id}>{announcement.description}</Announcement>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleSubmit}>Submit</Button> */}
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={3} style={{ background: '#fff', borderBottom: '#388e3c 3px solid', color: '#388e3c' }}>
          <Toolbar>

            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }} onClick={navigateHomePage}>
            <img
              src={logoImage}
              alt="HCMS Logo"
              style={{ maxHeight: "40px", marginRight: "10px", marginTop: "14px" }}
            />
            </Typography>
            {userInfo && (userInfo.userRole === 'resident') && <Button color="inherit" onClick={handlePrevComplain}>Complains</Button>}
            {userInfo && (userInfo.userRole === 'resident' || userInfo.userRole === 'supervisor') && <Button color="inherit" onClick={handleUpdateProfile}>Update Profile</Button>}
            {userInfo && (userInfo.userRole === 'admin' || userInfo.userRole === 'supervisor') && <Button color="inherit" onClick={handleAdminPage}>Dashboard</Button>}
            {userInfo && userInfo.userRole === 'resident' && <Button color="inherit" onClick={handleJoinUs}>Announcements</Button>}
            
            {userInfo && <Button color="inherit" onClick={handleLogOut}>LOGOUT</Button>}
            {!userInfo && <Link to='/login'>
              <Button sx={{color: "green"}}>LOGIN</Button>
            </Link>}
            {!userInfo && <Link to='/signup'><Button sx={{color: "green"}} color="inherit">SIGN UP</Button></Link>}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}



