import React from 'react';
import AdminSideNav from "../../../Components/adminPage/Navbar/side_nav/AdminSideNav";
import AdminTopNav from "../../../Components/adminPage/Navbar/top_nav/AdminTopNav";
import styles from "./AdminPage.module.css"; // Create this CSS module file for layout styling

const AdminPage = () => {
  return (
    <div className={styles.pageContainer}>
      <AdminTopNav />
      <div className={styles.content}>
        <AdminSideNav />
        <div className={styles.mainContent}>
          {/* Add main content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
