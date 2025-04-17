import React from 'react'
import { Grid, Typography, Card, CardContent, Button, Chip, List, ListItem, ListItemText } from '@mui/material'
import {updateComplaintSolved} from '../actions/complaintActions'
import {useSelector,useDispatch} from 'react-redux'
import Message from './Message'

const ComplaintsWorker = ({ complaintData }) => {
    const dispatch = useDispatch()
    const {success} = useSelector(state => state.updateComplaintSolved)
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

        const handleClick = () => {
            dispatch(updateComplaintSolved(complaintData.id))
        }
    return (
        <div>
            {success && <Message severity="success" open={true} message="Congratulations!! You Solved another Complaint!!"/>}
            <Card sx={{ margin: "5% 6% 0 6%", maxWidth: 550 }} variant="outlined" >
                <CardContent>
                    <Grid container direction="column" spacing={1}>
                        <Grid item md={12}>
                            <Typography variant="subtitle1">
                                <b>Name : </b>{complaintData.complaintCreatorInfo.firstName}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Phone Number : </b>{complaintData.complaintCreatorInfo.phoneNumber}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Address : </b>{complaintData.complaintCreatorInfo.address}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Complaint : </b>{description}
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container>
                                {complaintData.status === 'Assigned' && <Grid item md={6}><Typography variant="subtitle2"><b>OTP:</b>{complaintData.otpAssigned}</Typography></Grid>}
                                {complaintData.status === 'Assigned' && <Grid item md={6}>
                                    <Button variant="contained" color="success" onClick={handleClick}>MARK AS SOLVED</Button>
                                </Grid>}
                                {complaintData.status === 'Solved' && <Grid item md={6}><Chip label={complaintData.status} color="success" variant="outlined" /></Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default ComplaintsWorker