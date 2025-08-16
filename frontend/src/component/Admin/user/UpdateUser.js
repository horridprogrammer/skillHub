import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
    const location = useLocation();
    const nav = useNavigate();
    const userData = location.state; // Data passed from DisplayUser

    const [data, setData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        password: userData?.password || "",
        role: userData?.role || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8081/api/user/${userData.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("User Updated Successfully");
            nav("/admin/admin/user");
        } catch (error) {
            console.error("Error Updating User:", error);
            alert("Error while updating User");
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name :</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="email">Email : </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="password">Password : </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
                <br />

                <label>Role : </label>
                <input
                    type="radio"
                    name="role"
                    value="ADMIN"
                    checked={data.role === "ADMIN"}
                    onChange={handleChange}
                />
                <label>Admin</label>

                <input
                    type="radio"
                    name="role"
                    value="USER"
                    checked={data.role === "USER"}
                    onChange={handleChange}
                />
                <label>User</label>
                <br />

                <input type="submit" value="Update User" />{" "}
                <input type="button" value="Back" onClick={() => nav(-1)} />
            </form>
        </div>
    );
};

export default UpdateUser;
