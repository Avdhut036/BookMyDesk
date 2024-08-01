import styles from "./AdminSideNav.module.css"; 
import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Logo from '../../../../assets/img/SSPL-LOGO-1.ico';

const AdminSideNav = () => {
  const [openAdminDashboard, setOpenAdminDashboard] = React.useState(false);
  const [openManageTeam, setOpenManageTeam] = React.useState(false);
  const [openFloorLayout, setOpenFloorLayout] = React.useState(false);

  const handleToggleAdminDashboard = () => {
    setOpenAdminDashboard(!openAdminDashboard);
  };

  const handleToggleManageTeam = () => {
    setOpenManageTeam(!openManageTeam);
  };

  const handleToggleFloorLayout = () => {
    setOpenFloorLayout(!openFloorLayout);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Box sx={{ textAlign: 'center', padding: '16px' }}>
        <img 
          src={Logo} 
          alt="Company Logo" 
          className={styles.logo} 
        />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleToggleAdminDashboard}
            aria-expanded={openAdminDashboard}
            aria-controls="admin-dashboard-menu"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
            {openAdminDashboard ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {openAdminDashboard && (
          <Box component="div" id="admin-dashboard-menu" className={styles.subMenu}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="admin-dashboard-menu/home">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="admin-dashboard-menu/booking-history">
                <ListItemText primary="Booking History" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleToggleManageTeam}
            aria-expanded={openManageTeam}
            aria-controls="manage-team-menu"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Team" />
            {openManageTeam ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {openManageTeam && (
          <Box component="div" id="manage-team-menu" className={styles.subMenu}>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="manage-team-menu/seats-management">
                <ListItemText primary="Seats Management" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="manage-team-menu/user-management">
                <ListItemText primary="User Management" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
        <ListItemButton component={Link} to="admin-dashboard-menu/home">
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Book Seats" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <ListItemButton component={Link} to="admin-dashboard-menu/home">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleToggleFloorLayout}
            aria-expanded={openFloorLayout}
            aria-controls="floor-layout-menu"
          >
            <ListItemIcon>
              <ViewComfyIcon />
            </ListItemIcon>
            <ListItemText primary="Floor Layout" />
            {openFloorLayout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {openFloorLayout && (
          <Box component="div" id="floor-layout-menu" className={styles.subMenu}>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="admin-dashboard-menu/home">
                <ListItemText primary="Floor - 1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="admin-dashboard-menu/home">
                <ListItemText primary="Floor - 2" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
        <ListItemButton component={Link} to="admin-dashboard-menu/home">
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Data" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
}

export default AdminSideNav;
