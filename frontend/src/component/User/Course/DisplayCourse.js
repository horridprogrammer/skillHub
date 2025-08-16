import axios from "axios";
import { useEffect, useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const DisplayCouse = () =>{

    const [data,setData] = useState([]);

    const nav = useNavigate();

     useEffect(()=>{
        const fetchData = async () =>{
            try{
                const token = localStorage.getItem("token")
                const response = await axios.get("http://localhost:8081/api/course",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log("Course API response:", response.data);
            }catch(e){
                console.error("Error While Creating : ",e);
                alert("Error While Creating Course");
            }
        }
        fetchData();
    },[]);
    return <div className="card-container">
        {data.map((x,index)=>
            <div className="course-card" key={index}>
                <img src={`http://localhost:8081/uploads/${x.thumbnail}`} alt={x.title} className="course-img"></img>
                <div className="course-body">
                    <h2 className="course-title">{x.title}</h2>
                    <h4 className="course-category">{x.category}</h4>
                    <p className="course-description">{x.description}</p>
                    <input type="button" value="View Course" className="course-btn" onClick={()=>nav("/user/user/courseinfo",{
                        state:{course:x}
                    })}></input>
                </div>
                
            </div>
        )}
    </div>
}
export default DisplayCouse;