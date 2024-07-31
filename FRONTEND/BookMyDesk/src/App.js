import './App.css';
import {  Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import PublicPage from './Pages/Public/PublicPage';
import Login from './Components/publicPage/Credentials/Login/Login';
import AdminPage from './Pages/Roles/Admin/AdminPage';
import DailyUser from './Pages/Roles/User/dailyUser/DailyUser';
import WeeklyUser from './Pages/Roles/User/weeklyUser/WeeklyUser';

function App() {
  return (
    <div className="App">
   
     <Routes>
     
      {/* Public Page Routes */}

      <Route path="/public" element={<PublicPage />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Page Routes */}
      <Route path="/admin/home" element={<AdminPage />} />



      {/* User - Daily Page Routes */}
      <Route path="/dailyUser/home" element={<DailyUser />} />


      {/* User- Weekly Page Routes */}
      <Route path="/weeklyUser/home" element={<WeeklyUser />} />


     </Routes>
     
    </div>
  );
}

export default App;
