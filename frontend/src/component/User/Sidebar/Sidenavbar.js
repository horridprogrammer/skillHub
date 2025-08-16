import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
const Sidenavbar = () =>{
    return <div>
        <div className="sidebar-header">
            <img src={logo} alt="Skill HUb Logo" className="sidebar-logo"></img>
            <h2 className="sidebar-title">Skill Hub</h2><br/>
        </div>
        <ul className="sidebar-menu">
            <li><Link to="/user/user/dashboard">Dashboard</Link></li>
            <li><Link to="/user/user/course">Course</Link></li>
            <li><Link>Progress</Link></li>
            <li><Link>Certificate</Link></li>
        </ul>
    </div>
}
export default Sidenavbar;