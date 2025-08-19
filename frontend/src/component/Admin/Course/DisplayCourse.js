import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayCourse.css";

const DisplayCourse = () =>{

    const [data,setData] = useState([]);

    const nav = useNavigate();

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8081/api/course",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log("Course API response:", response.data);
            }catch(e){
                console.error("Error While Creating : ",e);
                alert("Error While Fetching Course");
            }
        }
        fetchData();
    },[]);

    const handleDelete=async (id)=>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8081/api/course/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setData(data.filter((x)=>x.id!==id));
            alert("Course Deleted SuccessFully");
        }catch(e){
            console.error("Error While deleting : ",e);
            alert("Error While Deleting Course");
        }
    }

    const handleUpdate = (course) =>{
        nav("/admin/admin/updatecourse",{state: course});
    }

    return <div className="display-course-container">
        <h1>Courses</h1>

        <div className="stats-container">
            <div className="stat-card">
                <span className="stat-title">Total Courses</span>
                <span className="stat-value">{data.length}</span>
            </div>
            <div className="stat-card">
                <span className="stat-title">Total Enrollments</span>
                <span className="stat-value">0</span> {/* replace 0 with actual count */}
            </div>
        </div>

        <div className="display-course-actions">
            <input type="button" value="Add Course" onClick={()=>nav("/admin/admin/addcourse")}></input>
        </div>
        <table className="course-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Thumbnail</th>
                </tr>
            </thead>
            <tbody>
                {data.map((x)=>
                    <tr key={x.id}>
                        <td>{x.title}</td>
                        <td>{x.category}</td>
                        <td>{x.description}</td>
                        <td>
                            <img
                                src={`http://localhost:8081/uploads/${x.thumbnail}`}
                                alt={x.title}
                                width="120"
                                height="80"
                            />
                        </td>
                        <td className="course-actions">
                            <input type="button" value="Remove" onClick={() => handleDelete(x.id)} />
                            <input type="button" value="Update" onClick={() => handleUpdate(x)} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}
export default DisplayCourse;