import React from "react";
import { Card, CardContent, Typography, Grid, Chip, ListItem, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from "react-redux";
import Message from '../components/Message'
import { deleteComplaint,updateComplaintSolved } from "../actions/complaintActions";

const Complaints = ({ complaintData }) => {
  const options = ["Delete"];
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch()
  const { success } = useSelector(state => state.deleteComplaint)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleDelete = (event) => {
    dispatch(deleteComplaint(complaintData.id))

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //will be called when mark as solved button will be pressed in order to make sure that complaint has been solved
  const handleSolve=()=>{
    dispatch(updateComplaintSolved(complaintData.id));
    window.location.reload();
  };

  let description
  if (complaintData.complaintType === 'Custom')
    description = complaintData.descriptionCustom
  else if (complaintData.complaintType === 'Standard')
    description = (
      <React.Fragment>
        <List>
          {complaintData.standardComplaintDescriptionInfo.map(s => (<ListItem disablePadding key={s.slug}><ListItemText primary={s.description} /></ListItem>))}
        </List>
      </React.Fragment>
    )

  return (
    <Card sx={{ margin: "5% 6% -3% 6%", maxWidth: 650, }} variant="outlined">
      {success && <Message severity="success" open={true} message="Complaint Deleted" />}
      
      <CardContent>
     
        <Grid container direction="column" spacing={0} alignItems="flex-start">
          <Grid item md={12} sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body" gutterBottom color="text.primary">
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={2}  sx={{margin: "9px 0 0 0"}}>
                <Typography color="brown" variant="button">
                  <b>{complaintData.createdOnDate.split('T')[0]}</b>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4,
                        width: '20ch',
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={handleDelete}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item><Chip label={complaintData.issueType} color="primary" variant="outlined" /></Grid>
        <Grid item><Chip label={complaintData.status} color="success" variant="outlined" /></Grid>
        <Grid item><Chip label={complaintData.complaintType} color="primary" variant="outlined" /></Grid>
        {/* {complaintData.status === 'Assigned' && <Grid item ><Typography variant="subtitle2"><b>OTP:</b>{complaintData.otpAssigned}</Typography></Grid>} */}
      </Grid>
    </Grid>
    <Grid item>
      {complaintData.status === 'Assigned' && 
        <Button variant="contained" color="primary" sx={{margin: "20px 0 0 0"}} onClick={handleSolve}>
          Mark as Solved
        </Button>
      }
    </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default Complaints;
