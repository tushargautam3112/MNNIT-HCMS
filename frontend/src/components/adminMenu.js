import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import logoImage from  "../assets/logoImage.png"

const drawerWidth = 240;

function AdminMenu(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    dispatch(logout());
  };

  const navigateHomePage = () => {
    navigate("/resident/homePage");
  };

  const drawer = (
    <div>
      <Typography variant="h5" sx={{ marginLeft: "40px", marginTop: "35px", zIndex: "20" }}>
        ADMIN ROLE
      </Typography>
      <Divider />
      <List>
        {/* <ListItemButton>
          <ListItemIcon>
            <MarkChatReadIcon />
          </ListItemIcon>
          <Link
            to="../admin/approveScreen"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText primary="Approve workers request" />
          </Link>
        </ListItemButton> */}

        {userInfo.userRole !== "supervisor" && (
          <>
            <ListItemButton>
              <ListItemIcon>
                <MarkChatReadIcon />
              </ListItemIcon>
              <Link
                to="../admin/AddWorker"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemText primary="Add workers" />
              </Link>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <Link
                to="../admin/AddSupervisor"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemText primary="Add Supervisor" />
              </Link>
            </ListItemButton>
          </>
        )}

        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <Link
            to="../admin/AssignPending"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText primary="Assign pending complaints" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          <Link
            to="../admin/announcementScreen"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText primary="Announcements" />
          </Link>
        </ListItemButton>
        {userInfo.userRole !== "supervisor" && (
          <ListItemButton>
            <ListItemIcon>
              <SupportAgentIcon />
            </ListItemIcon>
            <Link
              to="../admin/ServicesScreen"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="Standard Services" />
            </Link>
          </ListItemButton>
        )}
      </List>
      {/* </Box> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          borderBottom: "#0047AB 3px solid",
          color: "#0047AB ",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            flexGrow={1}
            onClick={navigateHomePage}
          >
            <img
              src={logoImage}
              alt="HCMS Logo"
              style={{ maxHeight: "40px", marginRight: "10px", marginTop: "14px" }}
            />
            
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

AdminMenu.propTypes = {
  window: PropTypes.func,
};

export default AdminMenu;
