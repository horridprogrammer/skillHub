import axios from "axios";
import { useEffect, useState } from "react";

const ViewCourse = () =>{

    const [data,setData] = useState({});

    useEffect(()=>{
        let id = 2;
        const fetchData = async ()=>{
            const response = await axios.get(`http://localhost:8081/api/course/${id}`);
            setData(response.data);
        }
        fetchData();
    },[])

    return <div>
        <h1>Course</h1>

        <h1>Title : {data.title}</h1><br/>
        <h2>Category : {data.category}</h2>
        <h3>Description : </h3><br/>
        <h4>{data.description}</h4><br/>
        <input type="submit" value="Enroll"></input>

    </div>
}
export default ViewCourse;