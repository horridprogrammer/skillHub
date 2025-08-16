import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UpdateCourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const courseData = location.state; // Data from DisplayCourse

    const [data, setData] = useState({
        title: courseData?.title || "",
        description: courseData?.description || "",
        category: courseData?.category || "",
        thumbnail: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail") {
            setData({ ...data, thumbnail: files[0] });
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

        // Append only if a new file is selected
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8081/api/course/${courseData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Course Updated Successfully");
            navigate("/admin/admin/course");
        } catch (error) {
            console.error("Error Updating Course:", error);
            alert("Error while updating course");
        }
    };

    return (
        <div>
            <h1>Update Course</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="thumbnail">Thumbnail:</label>
                <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleChange}
                />
                <br />
                <p>Current Thumbnail:</p>
                <img
                    src={`http://localhost:8081/uploads/${courseData?.thumbnail}`}
                    alt="Current thumbnail"
                    width="150"
                />
                <br />

                <input type="submit" value="Update Course" />
                <input type="button" value="Back" onClick={() => navigate(-1)} />
            </form>
        </div>
    );
};

export default UpdateCourse;
