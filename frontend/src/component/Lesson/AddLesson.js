import axios from "axios";
import { useEffect, useState } from "react";

const AddLesson =()=>{

    const [course,setCourse] = useState([]);

    const [data,setData] = useState({
        "title":"",
        "videoUrl":null,
        "lessonOrder":0,
        "course":""
    })

    useEffect(()=>{
        const fetchCourses =async ()=>{
            const response = await axios.get("http://localhost:8081/api/course");
            setCourse(response.data);
        }
        fetchCourses();
    },[]);

    const handleChange =(e)=>{
        const {name,value} = e.target;
        if(name==="video"){
            setData({...data,videoUrl:e.target.files[0]});
        }else if(name==="course"){
            setData({...data,[name]:course.find((x)=>x.title===value)})
        }else{
            setData({...data,[name]:value});
        }
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("videoUrl", data.videoUrl);
        formData.append("lessonOrder", data.lessonOrder);
        formData.append("course_id", data.course.id);
        try{
            const response = await axios.post("http://localhost:8081/api/lesson/add",formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Lesson Added SuccessFully");
            setData({
                "title":"",
                "videoUrl":null,
                "lessonOrder":0,
                "course":""
            })
            document.getElementById("video").value = null;
        }catch(e){
            console.error("Error While Adding Lesson : ",e);
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }
            alert("Error While Adding Lesson")
        }
    }

    return <div>

        <h1>Add Lesson</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title : </label>
            <input type="text" name="title" id="title" onChange={handleChange}></input><br/>
            <label htmlFor="video">Video : </label>
            <input type="file" name="video" id="video" onChange={handleChange} accept="video/*"></input><br/>
            <label htmlFor="lessonOrder">Lesson Order : </label>
            <input type="number" name="lessonOrder" id="lessonOrder" onChange={handleChange}></input><br/>
            <label htmlFor="course">Course : </label>
            <select name="course" id="course" onChange={handleChange}>
                <option>select</option>
                {course.map((x)=>
                    <option value={x.title}>{x.title}</option>
                )}
            </select><br/>
            <input type="submit" value="Add Lesson"></input>
            
        </form>
    </div>
}
export default AddLesson;