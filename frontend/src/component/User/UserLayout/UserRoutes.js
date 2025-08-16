import { Routes,Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import Dashboard from "../Dashboard/Dashboard";
import DisplayCourse from "../Course/DisplayCourse"
import CourseInfo from "../Course/CourseInfo";

const UserRoutes = () =>{
    return <Routes>
        <Route path="/user" element={<UserLayout/>}>
            <Route path="dashboard" element={<Dashboard/>}></Route>
            <Route path="course" element={<DisplayCourse/>}></Route>
            <Route path="courseinfo" element={<CourseInfo/>}></Route>
        </Route>
    </Routes>
}
export default UserRoutes;