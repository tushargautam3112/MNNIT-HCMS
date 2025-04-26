import React, { useState, useEffect } from 'react'
import AdminMenu from '../components/adminMenu'
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { createService, getAllServices } from '../actions/servicesActions'
import { useNavigate } from 'react-router-dom'
import { getRoles } from '../actions/userRoleActions'
import Service from '../components/Service'
import Loader from '../components/Loader'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formContainer = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: auto;c
`;

const pageWrapper = css`
  min-height: 100vh;
 background:  #D2FAFA;
  padding-top: 2rem;
`;

const ServicesScreen = () => {
  const { roles } = useSelector(state => state.getRoles)
  const { loading, services } = useSelector(state => state.getAllServices)
  const { service } = useSelector(state => state.createService)
  const { userInfo } = useSelector(state => state.userLogin)

  const [open, setOpen] = useState(false)
  const [department, setDepartment] = useState('')
  const [description, setDescription] = useState('')
  const [departmentChecked, setDepartmentChecked] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRefreshServices = () => {
    dispatch(getAllServices([]))
  }

  useEffect(() => {
    if (!userInfo) navigate('/login')
    if (!services) handleRefreshServices()
    if (!roles) dispatch(getRoles(['admin', 'resident']))
    if (service) handleRefreshServices()
  }, [service])

  const handleChecked = (event, key) => {
    if (event.target.checked) {
      setDepartmentChecked(prev => [...prev, key])
    } else {
      setDepartmentChecked(prev => prev.filter(s => s !== key))
    }
  }

  const handleCreateService = () => {
    dispatch(createService(description, department))
    setDepartment('')
    setDescription('')
  }

  return (
    <div css={pageWrapper}>
      <AdminMenu />
      {loading && <Loader />}

      {/* Filter Dialog */}
      <Dialog open={open}>
        <DialogTitle>Filter Services</DialogTitle>
        <DialogContent>
          <FormControl>
            {roles && roles.map(role => (
              <FormControlLabel
                key={role._id}
                control={<Checkbox onChange={e => handleChecked(e, role.slug)} />}
                label={role.name}
              />
            ))}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false)
              dispatch(getAllServices(departmentChecked))
              setDepartmentChecked([])
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Filter Button */}
      <Grid position="fixed" right="30px" top="98px" item xs={12} display="flex">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Filter
        </Button>
      </Grid>

      {/* Main Grid Layout */}
      <div css={formContainer}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0047AB", mb: 5, textAlign: "center", fontWeight:"bold" }}>
              Common Services
            </Typography>
        <Grid container spacing={4}>
          {/* Left: Available Services */}
          
          <Grid item xs={12} md={7}>
            
            <Grid container spacing={2}>
              {services && services.map(service => (
                <Grid item xs={12} key={service.slug}>
                  <Service serviceData={service} refresh={handleRefreshServices} />
                </Grid>
              ))}
              {services && services.length === 0 && (
                <Typography sx={{ color: "#777", mt: 2 }}>
                  No services available. Try creating one or change the filter.
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Right: Create New Service Form */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ p: 4 }}>
              <Typography
              
              variant="h6"
                sx={{ color: "#0047AB", textAlign: "center", mb: 2 }}>
                Create New Service
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={department}
                  label="Department"
                  onChange={e => setDepartment(e.target.value)}
                >
                  {roles && roles.map(role => (
                    <MenuItem value={role.slug} key={role.slug}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Description"
                multiline
                maxRows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
              <Button variant="contained" color="success" fullWidth disabled={!description || !department} onClick={handleCreateService}>
                Create Service
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ServicesScreen
