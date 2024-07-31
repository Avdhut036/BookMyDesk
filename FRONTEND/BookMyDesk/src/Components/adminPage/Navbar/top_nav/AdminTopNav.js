import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import styles from './AdminTopNav.module.css'; // Create this CSS module file for custom styles

const AdminTopNav = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <IconButton edge="start" color="inherit" aria-label="menu" className={styles.menuButton}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ marginLeft: 1 }}>
          <NotificationsIcon />
        </IconButton>
        <Avatar alt="Admin" src="/static/images/avatar/1.jpg" sx={{ marginLeft: 2 }} />
      </Box>
    </Box>
  );
};

export default AdminTopNav;
