import { useNavigate } from "react-router-dom";

const SideNavbar = () =>{

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear();
        navigate("/login");
    }
    
    return <div>
        <h1>Admin Pannel</h1>
        <ul>
            <li onClick={()=>navigate("/admin")}>Dashboard</li>
            <li onClick={()=>navigate("/add-course")}>Add Course</li>
            <li onClick={()=>navigate("/add-lesson")}>Add Lesson</li>
            <li onClick={()=>navigate("/add-quiz")}>Add Quiz</li>
            <li onClick={()=>navigate("/add-user")}>Add User</li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    </div>
}
export default SideNavbar;