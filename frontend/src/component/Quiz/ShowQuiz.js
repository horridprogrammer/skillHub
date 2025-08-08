import axios from "axios";
import { useEffect, useState } from "react";

const ShowQuiz = () =>{

    const [data,setData] = useState(null);

    const [ans,setAns] = useState("");

    useEffect(()=>{
        const fetchData =async ()=>{
            let id = 1;
            const response = await axios.get(`http://localhost:8081/api/quiz/${id}`);
            setData(response.data);
        }
        fetchData();
    },[]);

    const handleChange = (e) =>{
        setAns(e.target.value);
    }

    const handleNext = () =>{
        if(ans===data.answers){
            alert("Correct Answer");
        }
        else if(ans===""){
            alert("Select An Answer");
        }else{
            alert("Wrong Answer");
        }
    }

    if (!data) return null;

    return <div>
        <h1>Question : </h1>
        {data.questions}<br/>
        {data.options.map((x,index)=>
            <label key={index}><input type="radio" name="option" value={x} onChange={handleChange}></input>{x}</label>
        )}<br/>
        <input type="button" value="prev"></input>
        <input type="button" value="Next" onClick={handleNext}></input>
    </div>
}
export default ShowQuiz;