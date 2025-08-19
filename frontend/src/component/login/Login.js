import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", {
                email: data.username, // Backend expects 'email'
                password: data.password
            });

            const token = response.data.token;
            const role = response.data.role;
            const email = data.username;

            console.log(response.data)

            // Save to localStorage
            localStorage.setItem("token", token);
            console.log(localStorage.getItem("token"));
            localStorage.setItem("role", role);
            console.log(localStorage.getItem("role"));
            localStorage.setItem("email",email);
            console.log(localStorage.getItem("email"))

            // Redirect based on role
            if (role === "ROLE_ADMIN") {
                nav("/admin/admin/dashboard", { replace: true });
            } else if (role === "ROLE_USER") {
                nav("/user/user/dashboard", { replace: true });
            } else {
                nav("/unauthorized", { replace: true });
            }

        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="sh1-container">
            
            <form className="sh1-form" onSubmit={handleSubmit}>
                <h1 className="sh1-heading">Login</h1>
                <div className="sh1-form-row">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                    className="sh1-input"
                    onChange={handleChange}
                />
                </div>

                <div className="sh1-form-row">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="sh1-input"
                    onChange={handleChange}
                />
                </div>

                <input type="submit" value="Login" className="sh1-button" />
            </form>
        </div>


    );
};

export default Login;
