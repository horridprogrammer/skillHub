import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DisplayUser = () =>{

    const [data,setData] = useState([]);
    const [show,setShow] = useState(false);
    const nav = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8081/api/user",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error Fetching User:", error);
                alert("Error while Fetching User");
            }
        };
        fetchData();
    },[]);

    const handleDelete =async (x)=>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8081/api/user/${x}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setData(data.filter((y)=>y.id!==x));
            alert("User Deleted successfully");
        }catch(error){
            console.error("Error Deleting Data : ",error);
            alert("Error While Deleting Data");
        }
    }

    const handleUpdate = (user)=>{
        nav("/admin/admin/updateuser", { state: user });
    }

    return  <div>
            <h1>Users</h1>
            <p>Total Users : {data.length} Total Admin : {data.filter((x)=>x.role==="ADMIN").length} Total Non-Admin : {data.filter((x)=>x.role!=="ADMIN").length}</p>
            <input type="button" value="Add New User" onClick={()=>nav("/admin/admin/adduser")}></input>
            <table border="1px">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x)=>
                    <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>{x.email}</td>
                        <td>{x.password}</td>
                        <td>{x.role}</td>
                        <td><input type="button" value="Remove" onClick={()=>handleDelete(x.id)}></input></td>
                        <td><input type="button" value="Update" onClick={()=>handleUpdate(x)}></input></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
}
export default DisplayUser;