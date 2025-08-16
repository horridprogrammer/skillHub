import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateLesson = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lesson = location.state; // Passed from DisplayLesson

  const [courseData, setCourseData] = useState([]);
  const [data, setData] = useState({
    title: "",
    lessonOrder: "",
    video: null,
    courseId: ""
  });

  // Fetch all courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/course", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourseData(response.data);
      } catch (e) {
        console.error("Error fetching courses:", e);
        alert("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  // Pre-fill form with lesson data
  useEffect(() => {
    if (lesson) {
      setData({
        title: lesson.title || "",
        lessonOrder: lesson.lessonOrder || "",
        video: null,
        courseId: lesson.courseId ? String(lesson.courseId) : ""
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setData({ ...data, video: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("lessonOrder", data.lessonOrder);
  formData.append("course_id", data.courseId);

  if (data.video) {
    formData.append("video", data.video);
  }

  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:8081/api/lesson/${lesson.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Don't set Content-Type here
        }
      }
    );

    alert("Lesson updated successfully");
    navigate("/admin/admin/lesson");
  } catch (error) {
    console.error("Error updating lesson:", error);
    alert("Failed to update lesson");
  }
};


  return (
    <div>
      <h1>Update Lesson</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={data.title} onChange={handleChange} />
        <br />

        <label>Lesson Order:</label>
        <input
          type="number"
          name="lessonOrder"
          value={data.lessonOrder}
          onChange={handleChange}
        />
        <br />

        <label>Course:</label>
        <select name="courseId" value={data.courseId} onChange={handleChange}>
          <option value="">Select</option>
          {courseData.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.title}
            </option>
          ))}
        </select>
        <br />

        <label>Video:</label>
        <input type="file" name="video" accept="video/*" onChange={handleChange} />
        <br />

        {lesson.videoUrl && (
          <>
            <p>Current Video:</p>
            <video
              src={`http://localhost:8081/videUploads/${lesson.videoUrl}`}
              width="300"
              height="200"
              controls
            />
          </>
        )}
        <br />

        <button type="submit">Update Lesson</button>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
