import logo from "../../../assets/logo.png";
import "./SideNavbar.css";
import { Link, useNavigate } from "react-router-dom";
const SideNavbar = () =>{

  const nav = useNavigate();

  const handleLogout =(e) =>{
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    nav("/login");
  }
  return <div className="sidenavbar-main">
    
      <div className="sidebar-header">
        <img src={logo} alt="Skill HUb Logo" className="sidebar-logo"></img>
        <h2 className="sidebar-title">Skill Hub</h2><br/>
      </div>

    <ul className="sidebar-menu">
      <li><Link to="/admin/admin/dashboard">Dashboard</Link></li>
      <li><Link to="/admin/admin/user">User</Link></li>
      <li><Link to="/admin/admin/course">Course</Link></li>
      <li><Link to="/admin/admin/lesson">Lesson</Link></li>
      <li><a>Enrollment</a></li>
      <li><a>Progress</a></li>
      <li><a>Quiz</a></li>
      <li><a>Certificate</a></li>
      <li><a href="#" onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>
}
export default SideNavbar;