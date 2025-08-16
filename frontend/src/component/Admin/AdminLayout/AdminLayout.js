import { useState } from "react";
import SideNavbar from "../Sidebar/SideNavbar";
import { FiMenu, FiX } from "react-icons/fi";
import "./AdminLayout.css";
import { Navigate, Outlet } from "react-router-dom";
const AdminLayout =()=>{
    const [isOpen,setIsOpen] = useState(false);
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
        return <Navigate to="/login" replace />;
    }
    return <div className="admin-layout">
        <button className="sidebar-toggle" onClick={()=>setIsOpen(!isOpen)}>
            {isOpen?<FiX size={24}/>:<FiMenu size={24}/>}
        </button>
        {isOpen && <SideNavbar/>}
        <div className="admin-content">
            <Outlet/>
        </div>
    </div>
}
export default AdminLayout;