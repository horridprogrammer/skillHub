// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login/Login"
import AdminRoute from "./component/Admin/AdminLayout/AdminRoute";
import UserRoutes from "./component/User/UserLayout/UserRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/*" element={<AdminRoute/>}></Route>
        <Route path="/user/*" element={<UserRoutes/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
