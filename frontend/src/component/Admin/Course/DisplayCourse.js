import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    return <div>
        <h1>Courses</h1>

        <p>Total Courses : {data.length} Total number of Enrollments : </p>

        <input type="button" value="Add Course" onClick={()=>nav("/admin/admin/addcourse")}></input>
        <table border="1px">
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
                        <td><input type="button" value="Remove" onClick={()=>handleDelete(x.id)}></input></td>
                        <td><input type="button" value="Update" onClick={()=>handleUpdate(x)}></input></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}
export default DisplayCourse;