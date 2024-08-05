import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faChartLine, faSliders, faCircleQuestion, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminTopNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!anchorEl?.contains(event.target)) handleMenuClose();
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [anchorEl]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '8px 16px', 
        backgroundColor: '#fff', 
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', 
        height: '50px' 
      }}
    >
      <IconButton 
        edge="start" 
        color="inherit" 
        aria-label="menu" 
        sx={{ height: 36, width: 36 }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="inherit" sx={{ height: 36, width: 36 }}>
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ height: 36, width: 36, ml: 1 }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton 
          onClick={handleMenuOpen} 
          sx={{ height: 36, width: 36, padding: 0 }}
        >
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              width: 220,
              mt: 1,
              borderRadius: 1,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation('/edit-profile')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} /> Edit Profile
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/inbox')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} /> Inbox
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/analytics')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} /> Analytics
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faSliders} style={{ marginRight: '8px' }} /> Settings
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/help-support')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faCircleQuestion} style={{ marginRight: '8px' }} /> Help & Support
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/logout')} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginRight: '8px' }} /> Log out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default AdminTopNav;