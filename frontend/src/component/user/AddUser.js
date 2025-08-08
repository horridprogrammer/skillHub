import { useState } from "react";
import axios from "axios";

const AddUser = () =>{

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
            const response = await axios.post("http://localhost:8081/api/user/add",data);
            alert("User Added SuccessFully");

            setData({
                name: "",
                email: "",
                password: "",
                role: ""
            });
        }catch(error){
            console.error("Error Adding User:",error);
            alert("Error while adding User");
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" placeholder="Enter name" onChange={handleChange}></input><br/>
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" placeholder="Enter email" onChange={handleChange}></input><br/>
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={handleChange}></input><br/>
            <label htmlFor="role">Role : </label>
            <input type="text" id="role" name="role" placeholder="Enter Role" onChange={handleChange}></input><br/>
            <input type="submit" value="Add User"></input>
        </form>
    </div>;
}
// Working Perfect With Backend
export default AddUser;