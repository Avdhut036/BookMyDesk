import AdminSideNav from "../../../Components/adminPage/Navbar/side_nav/AdminSideNav";
import AdminTopNav from "../../../Components/adminPage/Navbar/top_nav/AdminTopNav";
import styles from "./AdminPage.module.css"; 
import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';

const AdminPage = () => {
  const [sideNavOpen, setSideNavOpen] = useState(true);

  const handleDrawerToggle = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSideNav open={sideNavOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
    
      >
        <AdminTopNav onMenuClick={handleDrawerToggle} />
        {/* Your other content here */}
      </Box>
    </Box>
  );
};

export default AdminPage;
