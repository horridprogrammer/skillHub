import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState([]);
    const [data, setData] = useState({
        "username": "",
        "password": ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", {
                email: data.username,   // Backend expects 'email'
                password: data.password
            });

            const token = response.data.token;
            const role = response.data.role;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // Optional redirect logic
            if (role === "ROLE_ADMIN") {
                window.location.href = "/admin";
            } else if (role === "ROLE_USER") {
                window.location.href = "/user";
            } else {
                window.location.href = "/unauthorized";
            }

        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username : </label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
            /><br />
            <label htmlFor="password">Password : </label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
            /><br />
            <input type="submit" value="Login" />
        </form>
    </div>
};

export default Login;
