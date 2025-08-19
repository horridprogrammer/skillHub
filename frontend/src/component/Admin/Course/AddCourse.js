import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCourse.css"

const AddCourse = () => {
    const navigate = useNavigate();

    // ✅ Access Control Check
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ROLE_ADMIN") {
            alert("Access Denied. Admins only.");
            navigate("/unauthorized"); // or navigate("/login");
        }
    }, [navigate]);

    const [data, setData] = useState({
        title: "",
        description: "",
        category: "",
        thumbnail: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "thumbnail") {
            setData({ ...data, [name]: e.target.files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("thumbnail", data.thumbnail);

        try {
            const response = await axios.post("http://localhost:8081/api/course/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ Add JWT
                }
            });

            alert("Course Added Successfully");

            setData({
                title: "",
                description: "",
                category: "",
                thumbnail: null,
            });

            document.getElementById("thumbnail").value = null;
            navigate("/admin/admin/course");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Check the console.");
        }
    };

    return <div className="add-course-container">
        <h1>Add Course</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={handleChange} />

            <label htmlFor="des">Description</label>
            <input type="text" name="description" id="description" onChange={handleChange} />

            <label htmlFor="category">Category</label>
            <input type="text" name="category" id="category" onChange={handleChange} />

            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="file" name="thumbnail" id="thumbnail" accept="image/*" onChange={handleChange} />

            <div className="form-buttons">
                <input type="submit" value="Add Course" />
                <input type="button" value="Back" onClick={() => navigate(-1)} />
            </div>
        </form>
    </div>
};

export default AddCourse;
