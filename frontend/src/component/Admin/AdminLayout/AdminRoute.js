import Dashboard from "../Dashboard/Dashboard";
import DisplayUser from "../user/DisplayUser";
import DisplayCourse from "../Course/DisplayCourse";
import AddCourse from "../Course/AddCourse";
import AddUser from "../user/AddUser"
import AdminLayout from "./AdminLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateUser from "../user/UpdateUser";
import UpdateCourse from "../Course/UpdateCourse";
import DisplayLesson from "../Lesson/DisplayLesson";
import AddLesson from "../Lesson/AddLesson";
import UpdateLesson from "../Lesson/UpdateLesson";

const AdminRoute = () =>{
    const role = localStorage.getItem("role");
    if(role!= "ROLE_ADMIN"){
        return <Navigate to="/login" replace/>;
    }
    return <Routes>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<Dashboard/>}></Route>
            <Route path="user" element={<DisplayUser/>}></Route>
            <Route path="adduser" element={<AddUser/>}></Route>
            <Route path="updateuser" element={<UpdateUser/>}></Route>
            <Route path="course" element={<DisplayCourse/>}></Route>
            <Route path="addcourse" element={<AddCourse/>}></Route>
            <Route path="updatecourse" element={<UpdateCourse/>}></Route>
            <Route path="lesson" element={<DisplayLesson/>}></Route>
            <Route path="addlesson" element={<AddLesson/>}></Route>
            <Route path="updatelesson" element={<UpdateLesson/>}></Route>
        </Route>
    </Routes>
}
export default AdminRoute;