import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseInfo = () =>{
    const nav = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    const [isEnrolled,setIsEnrolled] = useState(false);
    const [data,setData] = useState({
        "date":new Date().toISOString().slice(0,19),
        "user":{},
        "course":course
    });

    const handleEnrollment = async (e) =>{
        e.preventDefault();
        if(e.target.value==="Enroll"){
            try{
                const token = localStorage.getItem("token");
                console.log(data)
                console.log(token)
                const response = await axios.post("http://localhost:8081/api/enrollment/add",data,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setIsEnrolled(true);
                alert("You are Successfully Enrolled")
            }catch(e){
                console.log("Error : ",e);
            }
        }
        
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            const response = await axios.get(`http://localhost:8081/api/user/email/${email}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setData((prev) => ({ ...prev, user: response.data }));
            const res = await axios.get(`http://localhost:8081/api/enrollment/user/${response.data.id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            } catch (e) {
                console.log("Error:", e);
            }
        };

        fetchData();
    }, []);

    
    return <div>
        <h1>Course Info</h1>
        <img src={`http://localhost:8081/uploads/${course.thumbnail}`} width="500px" height="300px"></img>
        <h2>Title : {course.title}</h2>
        <h2>Category : {course.category}</h2>
        <h3>Description : </h3>
        <p>{course.description}</p>
        <input type="button" value={isEnrolled?"Enrolled":"Enroll"} onClick={handleEnrollment}></input>
        <input type="button" value="Back" onClick={()=>nav(-1)}></input>
    </div>
}
export default CourseInfo;