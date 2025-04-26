import React from 'react'
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Complaints from '../components/complaints.js'
import Header from '../components/header.js';
import { Typography, Divider, Button } from '@mui/material'
import RegisterComplaint from "../components/RegisterComplaint";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../actions/userRoleActions'
import { getComplaints } from '../actions/complaintActions.js';
import Loader from '../components/Loader.js'
import { useNavigate } from 'react-router-dom';


/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formContainer = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 80px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  margin: 100px auto;
  transform: translateX(-60px)
`;

const pageWrapper = css`
  min-height: 100vh;
  background:  #D2FAFA;
  padding-top: 1.8rem;
`;

const ComplaintScreen = () => {
  const [filters, setFilters] = useState([]);

  const Roles = useSelector(state => state.getRoles)
  const { roles } = Roles

  const allComplaints = useSelector(state => state.getComplaints)
  const { loading, complaints } = allComplaints

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("hello there");
      setFilters(prevState => [...prevState, event.target.value]);
      // console.log(filters);
    } else if (!event.target.checked) {
      setFilters(prevstate => prevstate.filter(s => s !== event.target.value))
    }
    
  }

  const applyFilter = () => {
    dispatch(getComplaints(filters, departmentChecked))
  }
  
  const [departmentChecked, setDepartmentChecked] = useState([])

  const handleChecked = (event, key) => {
    if (event.target.checked) {
      setDepartmentChecked(prevState => [...prevState, key])
    } else if (!event.target.checked) {
      setDepartmentChecked(prevstate => prevstate.filter(s => s !== key))
    }
  }


  useEffect(() => {
    if (!userInfo)
      navigate('/login')
    if (!roles)
      dispatch(getRoles(['admin', 'resident']))
    if (!complaints)
      dispatch(getComplaints(['Pending', 'Assigned', 'Solved'], departmentChecked));
    applyFilter();
  }, [])


  return (
    <div css={pageWrapper}>
      <Header />
      <Grid container direction="row" spacing={2} marginLeft="2px" sx={{ background:"#D2FAFA"}} >
        <Grid item xs={2} sx={{ margin: "0 0 0 0", height: '100vh', background: "white", position: "fixed" }} >
          <Typography
            variant="h5"
            sx={{
              color: "#283593",
              marginBottom: 0,
              margin: "70px 0 10px 10px",
              background:"white"
            }}
          >FILTER</Typography>
          <Typography variant="body"
            sx={{
              marginBottom: 0,
              marginTop: "10px",
            }}>
            STATUS :
          </Typography>
          <FormControl>
            <FormControlLabel value="Pending" control={<Checkbox onChange={e => handleChange(e)} />} label="Pending" />

            <FormControlLabel value="Assigned" control={<Checkbox onChange={e => handleChange(e)} />} label="Assigned" />

            <FormControlLabel value="Solved" control={<Checkbox onChange={e => handleChange(e)} />} label="Solved" />
          </FormControl>

          <Typography variant="body"
            sx={{
              fontFamily: "Arizonia",
              marginBottom: 0,
              marginTop: "1px",
            }}>
            DEPARTMENT :
          </Typography>
          <Divider/>
          {roles && roles.map(role => <FormControlLabel value={role.slug} control={<Checkbox onChange={e => handleChecked(e, role.slug)} />} label={role.name} key={role._id} />)}
          <Button color="success" onClick={applyFilter} variant="contained">APPLY FILTER</Button>
        </Grid>
        <Divider orientation="vertical" flexItem={true} />
        <Grid css={formContainer} item sx={{ textAlign: "center", background: "white" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0047AB", mt:"20px", textAlign: "center", }}>
              Your Complaints
            </Typography>
          {loading && <Loader />}
          {!loading && complaints && complaints.map(complaint => (<Complaints complaintData={complaint} key={complaint.id}/>))}
        </Grid>
        <Grid item sx={{ margin: "6% 2% 0 2%" , background: "white", position:"fixed", borderRadius: "20px" ,right:0, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
          <DynamicFeedIcon sx={{ margin: "0 45%" }} fontSize="large" />
          <Typography
            variant="h5"
            textAlign={"center"}
            padding={1}
            sx={{
              color: "#283593",
            }}
          >
            Register a Complaint
          </Typography>
          <RegisterComplaint />
        </Grid>
      </Grid>
    </div>
  )
}

export default ComplaintScreen;
