import axios from "axios";
import { useEffect, useState } from "react";

const DisplayCourse = () =>{

    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get("http://localhost:8081/api/course");
                setData(response.data);
                console.log("Course API response:", response.data);
            }catch(e){
                console.error("Error While Creating : ",e);
                alert("Error While Creating Course");
            }
        }
        fetchData();
    },[]);

    const handleDelete=async (id)=>{
        try{
            const response = await axios.delete(`http://localhost:8081/api/course/${id}`);
            setData(data.filter((x)=>x.id!==id));
            alert("Course Deleted SuccessFully");
        }catch(e){
            console.error("Error While deleting : ",e);
            alert("Error While Deleting Course");
        }
    }

    return <div>
        <h1>Courses</h1>

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
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}
export default DisplayCourse;