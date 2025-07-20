import { useState } from "react";

const Login = () =>{

    const [formData,setFormData] = useState([]);

    const [data,setData] =useState({
        "username":"",
        "password":""
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setData({...data,[name]:value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormData([...formData,data])
    }

    
    return <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username : </label>
            <input type="text" id="username" name="username" placeholder="Enter Username" onChange={handleChange}></input><br/>
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" name="password" placeholder="Enter Password" onChange={handleChange}></input><br/>
            <input type="submit" value="Login"></input>
        </form>
    </div>
}

export default Login;