import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import AdminMenu from "../components/adminMenu";
import Announcement from "../components/Announcement";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAnnouncements,
  createAnnouncement,
} from "../actions/announcementActions";
import Loader from "../components/Loader";
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
  max-width: 1000px;
  max-width: 60%;
  margin: auto;
`;

const pageWrapper = css`
  min-height: 100vh;
 background: #f0f4f8;
  padding-top: 2rem;
`;


const AnnouncementScreen = () => {
  const [create, setCreate] = useState("");

  const dispatch = useDispatch();

  const { announcements, loading } = useSelector(
    (state) => state.getAllAnnouncements
  );
  const { success, announcement } = useSelector(
    (state) => state.createAnnouncement
  );

  useEffect(() => {
    if (!announcements || announcement) {
      dispatch(getAllAnnouncements());
    }
  }, [dispatch, announcement]);

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (create.trim() !== "") {
      dispatch(createAnnouncement(create));
      setCreate("");
    }
  };

  return (
    <div css={pageWrapper}>
      <AdminMenu />
      {success && (
        <Message open={true} severity="success" message="Announcement Created" />
      )}
      <Box css={formContainer} sx={{py: 3 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#0047AB",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Announcements
        </Typography>
        <Grid container spacing={4}>
          {/* LEFT SIDE - All Announcements */}
          <Grid item xs={12} md={7}>
            {loading ? (
              <Loader />
            ) : (
              announcements &&
              announcements.map((a) => (
                <Announcement
                  key={a._id}
                  id={a._id}
                  date={a.date.split("T")[0]}
                  handleRefreshAnnouncements={() =>
                    dispatch(getAllAnnouncements())
                  }
                >
                  {a.description}
                </Announcement>
              ))
            )}
          </Grid>

          {/* RIGHT SIDE - Create Announcement */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: "#0047AB", textAlign: "center", mb: 2 }}
              >
                Create New Announcement
              </Typography>
              <TextField
                multiline
                maxRows={6}
                value={create}
                onChange={(e) => setCreate(e.target.value)}
                placeholder="Write announcement here..."
                fullWidth
                sx={{ mb: 3 }}
              />
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateAnnouncement}
                >
                  Create
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AnnouncementScreen;
