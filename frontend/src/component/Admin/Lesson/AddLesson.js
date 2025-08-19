import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddLesson.css"
const AddLesson = () => {
  const [course, setCourse] = useState([]);
  const [data, setData] = useState({
    title: "",
    videoUrl: null,
    lessonOrder: 0,
    course: ""
  });

  const nav = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/course", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(response.data);
      } catch (e) {
        console.error("Error fetching courses:", e);
        alert("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setData({ ...data, videoUrl: files[0] });
    } else if (name === "course") {
      setData({ ...data, [name]: course.find((x) => x.title === value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.course) {
      alert("Please select a course");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("videoUrl", data.videoUrl);
    formData.append("lessonOrder", data.lessonOrder);
    formData.append("course_id", data.course.id);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8081/api/lesson/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      alert("Lesson Added Successfully");
      setData({ title: "", videoUrl: null, lessonOrder: 0, course: "" });
      document.getElementById("video").value = null;
      nav("/admin/admin/lesson");
    } catch (e) {
      console.error("Error While Adding Lesson:", e);
      alert("Error While Adding Lesson");
    }
  };

  return (
    <div className="sh1-container">
      <form className="sh1-form" onSubmit={handleSubmit}>
        <h1 className="sh1-heading">Add Lesson</h1>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="sh1-input"
          required
        />

        <label>Video:</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          className="sh1-input-file"
          required
        />

        <label>Lesson Order:</label>
        <input
          type="number"
          name="lessonOrder"
          value={data.lessonOrder}
          onChange={handleChange}
          className="sh1-input"
          required
        />

        <label>Course:</label>
        <select
          name="course"
          value={data.course?.title || ""}
          onChange={handleChange}
          className="sh1-select"
          required
        >
          <option value="">Select</option>
          {course.map((x) => (
            <option key={x.id} value={x.title}>
              {x.title}
            </option>
          ))}
        </select>

        <div className="sh1-button-group">
          <button type="submit" className="sh1-button sh1-button-primary">
            Add Lesson
          </button>
          <button
            type="button"
            className="sh1-button sh1-button-secondary"
            onClick={() => nav(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
