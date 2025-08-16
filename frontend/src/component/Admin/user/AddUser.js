import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () =>{
    
    const nav = useNavigate();

    const [data,setData] = useState({
        "name":"",
        "email":"",
        "password":"",
        "role":""
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setData({...data,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8081/api/user/add",data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            alert("User Added SuccessFully");

            setData({
                name: "",
                email: "",
                password: "",
                role: ""
            });

            nav("/admin/admin/user");

        }catch(error){
            console.error("Error Adding User:",error);
            alert("Error while adding User");
        }
    }

    return <div>
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" placeholder="Enter name" onChange={handleChange}></input><br/>
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" placeholder="Enter email" onChange={handleChange}></input><br/>
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={handleChange}></input><br/>
            <label htmlFor="role">Role : </label>
            <input type="radio" id="role" name="role" value="ADMIN" onChange={handleChange}></input><label>Admin</label> <input type="radio" id="role" name="role" value="USER" onChange={handleChange}></input><label>User</label><br/>
            <input type="submit" value="Add User"></input> <input type="button" value="Back" onClick={()=>nav(-1)}></input>
        </form>
        
    </div>;
}
// Working Perfect With Backend
export default AddUser;