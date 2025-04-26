import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // optional for selected tab marker

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import UpdateIcon from "@mui/icons-material/Update";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { logout } from "../actions/userActions";
import logoImage from "../assets/logoImage.png";
import mnnitLogo from "../assets/mnnitlogo.png";

const drawerWidth = 240;

function AdminMenu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navigateHomePage = () => {
    navigate("/resident/homePage");
  };


  const drawerGreen = "#2e7d32";
  const selectedBg = "#e8f5e9";

  const NavLink = ({ to, icon, label }) => {
    const location = useLocation();
    const selected = location.pathname === to;

    return (
      <ListItemButton
        component={Link}
        to={to}
        selected={selected}
        sx={{
          backgroundColor: selected ? selectedBg : "transparent",
          borderLeft: selected ? `6px solid #3387DB` : "6px solid transparent",
          "&:hover": {
            backgroundColor: "#e8f5e9",
          },
        }}
      >
        <ListItemIcon sx={{ color: drawerGreen }}>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ color: selected ? "black" : "#444", fontWeight: selected ? 800 : 400 }}
        />
      </ListItemButton>
    );
  };


  const drawer = (
    <Box sx={{ px: 1 }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mt: 2,
          mb: 1,
          fontWeight: "bold",
          color: "#0047AB"
        }}
      >
        <img src={mnnitLogo} alt="MNNIT Logo" style={{ height: "50px" }} />
      </Typography>
      <Divider />
      <List sx={{mt: 4}}>
        {userInfo?.userRole !== "supervisor" && (
          <>
            <NavLink to="/admin/AddWorker" icon={<MarkChatReadIcon />} label="Add Workers" />
            <NavLink to="/admin/AddSupervisor" icon={<GroupAddIcon />} label="Add Supervisor" />
          </>
        )}
        <NavLink to="/admin/AssignPending" icon={<AssignmentIcon />} label="Assign Complaints" />
        <NavLink to="/admin/announcementScreen" icon={<UpdateIcon />} label="Announcements" />
        {userInfo?.userRole !== "supervisor" && (
          <NavLink to="/admin/ServicesScreen" icon={<SupportAgentIcon />} label="Standard Services" />
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={6}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          color: "#0047AB",
          borderBottom: "3px solid #0047AB",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flexGrow: 1
            }}
            onClick={navigateHomePage}
          >
            <img src={logoImage} alt="HCMS Logo" style={{ height: "40px", marginRight: "12px" }} />
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogOut}
            sx={{ fontWeight: 600 }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="admin-nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Placeholder */}
      <Box component="main" sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {/* actual content goes here */}
      </Box>
    </Box>
  );
}

AdminMenu.propTypes = {
  window: PropTypes.func
};

export default AdminMenu;
