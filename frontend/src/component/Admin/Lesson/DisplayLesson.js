import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DisplayLesson = () => {
  const [courseData, setCourseData] = useState([]);
  const nav = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/lesson/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update nested lessons in courseData
      setCourseData(prevData =>
        prevData.map(course => ({
          ...course,
          lesson: course.lesson.filter(lesson => lesson.id !== id)
        }))
      );

      alert("Lesson Deleted Successfully");
    } catch (e) {
      console.error("Error While deleting : ", e);
      alert("Error While Deleting Lesson");
    }
  };

  useEffect(() => {
    const fetchLessonsAndCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const courseResponse = await axios.get("http://localhost:8081/api/course", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourseData(courseResponse.data);
      } catch (e) {
        console.error("Error fetching data:", e);
        alert("Error while fetching lesson data");
      }
    };

    fetchLessonsAndCourses();
  }, []);

  return (
    <div className="display-course-container">
      <h1>Lessons</h1>

      <div className="display-course-actions">
        <input
          type="button"
          value="Add Lesson"
          onClick={() => nav("/admin/admin/addlesson")}
        />
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-title">Total Courses</span>
          <span className="stat-value">{courseData.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Total Lessons</span>
          <span className="stat-value">
            {courseData.reduce((acc, c) => acc + c.lesson.length, 0)}
          </span>
        </div>
      </div>

      {courseData.map(course => (
        <div key={course.id}>
          <div className="course-title">{course.title}</div>
          <table className="course-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Lesson Order</th>
                <th>Video</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {course.lesson.map(lesson => (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lesson.lessonOrder}</td>
                  <td>
                    <video
                      src={`http://localhost:8081/videUploads/${lesson.videoUrl}`}
                      controls
                      style={{
                        width: "320px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "2px solid #007bff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        display: "block",
                        margin: "auto"
                      }}
                    />
                  </td>

                  <td className="course-actions">
                    <input
                      type="button"
                      value="Remove"
                      onClick={() => handleDelete(lesson.id)}
                    />
                  </td>
                  <td className="course-actions">
                    <input
                      type="button"
                      value="Update"
                      onClick={() =>
                        nav("/admin/admin/updatelesson", {
                          state: { ...lesson, courseId: course.id }
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DisplayLesson;
