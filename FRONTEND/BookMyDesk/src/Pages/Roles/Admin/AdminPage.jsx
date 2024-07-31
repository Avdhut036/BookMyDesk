import React from 'react';
import AdminSideNav from "../../../Components/adminPage/Navbar/side_nav/AdminSideNav";
import AdminTopNav from "../../../Components/adminPage/Navbar/top_nav/AdminTopNav";
import AddUser from '../../../Components/adminPage/AddUser';
import styles from "./AdminPage.module.css"; // Ensure CSS module has correct layout styles


const AdminPage = () => {
  return (
    <div className={styles.pageContainer}>
      <AdminTopNav />
      <div className={styles.mainContentWrapper}>
        <AdminSideNav />
        <div className={styles.mainContent}>
          {/* Add main content here */}
          <AddUser/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
