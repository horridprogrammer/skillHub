import axios from "axios";
import { useEffect, useState } from "react";

const DisplayLesson = () =>{

    const [lessonData,setLessonData] = useState([]);
    const [courseData,setCourseData] = useState([]);

    useEffect(()=>{
        const fetchLessons=async ()=>{
            try{
                const response = await axios.get("http://localhost:8081/api/lesson");
                const courseResponse = await axios.get("http://localhost:8081/api/course");
                setCourseData(courseResponse.data);
                setLessonData(response.data);
            }catch(e){
                console.error("Error Fetching Lesson Data : ",e);
                alert("Error While Fetching Lesson Data");
            }
        }
        fetchLessons();
    },[]);

    return <div>
        <h1>Lesson</h1>
        {courseData.map((x)=> 
        <div key={x.id}>
            <h2 key={x.id}>{x.title}</h2><br/>
            {lessonData.filter((z)=>z.course.title===x.title).map((y)=>
                <table border="1px" key={y.id}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Lesson Order</th>
                            <th>Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{y.title}</td>
                            <td>{y.lessonOrder}</td>
                            <td>
                                <video 
                                    src={`http://localhost:8081/videUploads/${y.videoUrl}`}
                                    alt={y.title}
                                    width="120"
                                    height="80"
                                    controls 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>)}
    </div>
}
export default DisplayLesson;