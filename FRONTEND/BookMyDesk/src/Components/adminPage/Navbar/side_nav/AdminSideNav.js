import styles from "./AdminSideNav.module.css"; 
import * as React from 'react';
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
import Logo from '../../../../assets/SSPL-LOGO-1.ico';

const AdminSideNav = () => {

  const [openAdminDashboard, setOpenAdminDashboard] = React.useState(false);
  const [openFloorLayout, setOpenFloorLayout] = React.useState(false);

  const handleToggleAdminDashboard = () => {
    setOpenAdminDashboard(!openAdminDashboard);
  };

  const handleToggleFloorLayout = () => {
    setOpenFloorLayout(!openFloorLayout);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ textAlign: 'center', padding: '16px' }}>
        <img src={Logo} alt="Company Logo" className={styles.logo} />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggleAdminDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
            {openAdminDashboard ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {openAdminDashboard && (
          <Box component="div" className={styles.subMenu}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Dashboard Item 1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Dashboard Item 2" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Your Bookings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggleFloorLayout}>
            <ListItemIcon>
              <ViewComfyIcon />
            </ListItemIcon>
            <ListItemText primary="Floor Layout" />
            {openFloorLayout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {openFloorLayout && (
          <Box component="div" className={styles.subMenu}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Floor Layout Item 1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Floor Layout Item 2" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
          <ListItemButton>
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
  
  return (
    <div>
      {DrawerList}
    </div>
  );
}

export default AdminSideNav;
