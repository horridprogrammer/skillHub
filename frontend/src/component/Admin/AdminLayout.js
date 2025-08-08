import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
const AdminLayout = () =>{
    return <div>
        <SideNavbar/>
        <div>
            <Outlet/>
        </div>
    </div>
}
export default AdminLayout;