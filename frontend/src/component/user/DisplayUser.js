import axios from "axios";
import { useEffect, useState } from "react";

const DisplayUser = () =>{

    const [data,setData] = useState([]);
    const [show,setShow] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/user");
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
            const response = await axios.delete(`http://localhost:8081/api/user/${x}`);
            setData(data.filter((y)=>y.id!==x));
            alert("User Deleted successfully");
        }catch(error){
            console.error("Error Deleting Data : ",error);
            alert("Error While Deleting Data");
        }
    }

    const handleUpdate = ()=>{

    }

    return  <div>
            <h2>Users:</h2>
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
                        <td><input type="button" value="Update" onClick={()=>handleUpdate()} onCli></input></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
}
export default DisplayUser;