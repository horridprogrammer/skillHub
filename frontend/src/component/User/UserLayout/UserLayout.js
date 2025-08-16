import { useState } from "react";
import Sidenavbar from "../Sidebar/Sidenavbar";
import { FiMenu, FiX } from "react-icons/fi";
import "./UserLayout.css";
import { Navigate, Outlet } from "react-router-dom";
const UserLayout =()=>{
    const [isOpen,setIsOpen] = useState(false);
    if (localStorage.getItem("role") !== "ROLE_USER") {
        return <Navigate to="/login" replace />;
    }
    return <div className="user-layout">
        <button className="sidebar-toggle" onClick={()=>setIsOpen(!isOpen)}>
            {isOpen?<FiX size={24}/>:<FiMenu size={24}/>}
        </button>
        {isOpen && <Sidenavbar/>}
        <div className="user-content">
            <Outlet/>
        </div>
    </div>
}
export default UserLayout;