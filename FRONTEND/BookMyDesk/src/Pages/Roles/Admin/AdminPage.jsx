import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideNav from "../../../Components/adminPage/Navbar/side_nav/AdminSideNav";
import AdminTopNav from "../../../Components/adminPage/Navbar/top_nav/AdminTopNav";
import styles from "./AdminPage.module.css"; // Ensure CSS module has correct layout styles

const AdminPage = () => {
  return (
    <div className={styles.pageContainer}>
      <AdminTopNav />
      <div className={styles.mainContentWrapper}>
        <AdminSideNav />
        <div className={styles.mainContent}>
          <Outlet /> {/* This will render the content based on the route */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
