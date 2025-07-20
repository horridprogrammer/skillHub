import { useState } from "react";

const AddUser = () =>{

    const [formData,setFormData] = useState([])

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

    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormData([...formData,data]);
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

export default AddUser;