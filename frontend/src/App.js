import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./component/login/Login";
import AddCourse from "./component/Course/AddCourse";
import DisplayCourseUser from "./component/Course/DisplayCourseUser";
import ViewCourse from "./component/Course/VIewCourse";
import AddLesson from "./component/Lesson/AddLesson";
import DisplayLesson from "./component/Lesson/DisplayLesson";
import AddQuiz from "./component/Quiz/AddQuiz";
import ShowQuiz from "./component/Quiz/ShowQuiz";
import AddUser from "./component/user/AddUser";
import DisplayUser from "./component/user/DisplayUser";


// ✅ Dummy components for dashboards and unauthorized
const AdminDashboard = () => <h2>Welcome Admin</h2>;
const UserDashboard = () => <h2>Welcome User</h2>;
const Unauthorized = () => <h2>Unauthorized Access</h2>;

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ Protected Route Logic
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!token) return <Navigate to="/login" />;
    if (requiredRole && role !== requiredRole) return <Navigate to="/unauthorized" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ✅ ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-course"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-lesson"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AddLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-quiz"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AddQuiz />
            </ProtectedRoute>
          }
        />

        {/* ✅ USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <DisplayCourseUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-course"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <ViewCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <DisplayLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <ShowQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <DisplayUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
