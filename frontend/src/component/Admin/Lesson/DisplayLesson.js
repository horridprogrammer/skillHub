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
        headers: {
          Authorization: `Bearer ${token}`
        }
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
      alert("Error While Deleting Course");
    }
  };


  useEffect(() => {
    const fetchLessonsAndCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch courses with lessons included
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
    <div>
      <h1>Lesson</h1>
      <input type="button" value="Add Lesson" onClick={() => nav("/admin/admin/addlesson")} />
      {courseData.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Lesson Order</th>
                <th>Video</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {course.lesson.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lesson.lessonOrder}</td>
                  <td>
                    <video
                      src={`http://localhost:8081/videUploads/${lesson.videoUrl}`}
                      controls
                      style={{
                        width: "480px",
                        height: "270px",
                        objectFit: "cover",
                        backgroundColor: "#000"
                      }}
                    />
                  </td>
                  <td>
                    <input type="button" value="Remove" onClick={()=>handleDelete(lesson.id)}></input>
                  </td>
                  <td>
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
