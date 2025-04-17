import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminMenu from '../components/adminMenu';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRoles } from '../actions/userRoleActions'
import ComplaintAdmin from '../components/complaintAdmin';
import { getComplaintsAdmin } from '../actions/complaintActions'
import Loader from '../components/Loader'
import { getWorkers } from '../actions/userActions';

const AssignPending = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const Roles = useSelector(state => state.getRoles)
  const { roles } = Roles

  const { loading, complaints } = useSelector(state => state.getComplaintsAdmin)

  const { workers } = useSelector(state => state.getWorkers)

  useEffect(() => {
    if (!userInfo)
      navigate('login')
    if (!roles)
      dispatch(getRoles(['admin', 'resident', 'supervisor']))
    if (!complaints)
      dispatch(getComplaintsAdmin(['Pending'], [], ['Custom','Standard']))
    if (!workers)
      dispatch(getWorkers(['admin', 'resident', 'supervisor']))
  }, [])

  const [open, setOpen] = React.useState(false);

  const [departmentChecked, setDepartmentChecked] = useState([])

  const handleChecked = (event, key) => {
    if (event.target.checked) {
      setDepartmentChecked(prevState => [...prevState, key])
    } else if (!event.target.checked) {
      setDepartmentChecked(prevstate => prevstate.filter(s => s !== key))
    }
  }

  const handleFILTER = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose()
    dispatch(getComplaintsAdmin(['Pending'], departmentChecked, ['Custom','Standard']))
  };

  return (
    <div>
      <AdminMenu />
      <Dialog open={open}>
        <DialogTitle>FILTER</DialogTitle>
        <DialogContent>
          <FormControl>
            {roles && roles.map(role => <FormControlLabel value={role.slug} control={<Checkbox onChange={e => handleChecked(e, role.slug)} />} label={role.name} key={role._id} />)}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} >Filter</Button>
        </DialogActions>
      </Dialog>
      <Box
        m={1} display="flex" justifyContent="flex-end" alignItems="flex-end" >
        <Button onClick={handleFILTER} variant="contained" >FILTER</Button>
      </Box>

      <Typography variant="h4" sx={{ textAlign: "center", color: "#0047AB " }}>PENDING COMPLAINTS</Typography>
      {loading && <Loader />}
      {userInfo.userRole === 'admin' && complaints && workers &&complaints.map(complaint => (<ComplaintAdmin complaintData={complaint} key={complaint.id} allWorkers={workers}/>))}
      {userInfo.userRole === 'supervisor' && complaints && workers &&complaints.map(complaint => ( userInfo.superVisor === complaint.issueType && <ComplaintAdmin userInfo={userInfo} complaintData={complaint} key={complaint.id} allWorkers={workers}/>))}

    </div>

  )
}


export default AssignPending