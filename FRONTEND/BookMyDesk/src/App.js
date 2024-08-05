import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import PublicPage from "./Pages/Public/PublicPage";
import Login from "./Components/publicPage/Credentials/Login/Login";
import AdminPage from "./Pages/Roles/Admin/AdminPage";
import DailyUser from "./Pages/Roles/User/dailyUser/DailyUser";
import WeeklyUser from "./Pages/Roles/User/weeklyUser/WeeklyUser";
import AdminDashboard from "./Components/adminPage/AdminDashboard";
import BookingsTable from "./Components/adminPage/BookingsTable";
import EmployeesTable from "./Components/adminPage/EmployeesTable";
import SeatsTable from "./Components/adminPage/SeatsTable";
import AddUser from "./Components/adminPage/AddUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Page Routes */}

          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Page Routes */}
          <Route path="/admin" element={<AdminPage />} >
          <Route path="admin-dashboard-menu/home" element={<AdminDashboard />} />
          <Route path="admin-dashboard-menu/booking-history" element={<BookingsTable/>}/>
          <Route path="manage-team-menu/seats-management" element={<SeatsTable/>}/>
          <Route path="manage-team-menu/user-management" element={<EmployeesTable />} />
          <Route path="manage-team-menu/user-management/add-user" element={<AddUser />}/>
          </Route>

          {/* User - Daily Page Routes */}
          <Route path="/dailyUser/home" element={<DailyUser />} />

          {/* User- Weekly Page Routes */}
          <Route path="/weeklyUser/home" element={<WeeklyUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
