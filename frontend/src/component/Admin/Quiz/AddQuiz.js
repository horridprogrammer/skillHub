import axios from "axios";
import { useEffect, useState } from "react";

const AddQuiz = () => {
  const [data, setData] = useState({
    question: "",
    options: ["", "", "", ""],
    ans: "",
    lesson: null,
  });

  const [lessonData, setLessonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/lesson");
        setLessonData(res.data);
      } catch (error) {
        console.error("Failed to fetch lessons", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "op1" || name === "op2" || name === "op3" || name === "op4") {
      const index = parseInt(name.charAt(2)) - 1;
      const updatedOptions = [...data.options];
      updatedOptions[index] = value;
      setData({ ...data, options: updatedOptions });
    } else if (name === "lesson") {
      const selectedLesson = lessonData.find((x) => x.title === value);
      setData({ ...data, lesson: selectedLesson || null });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      questions: data.question,
      options: data.options,
      answers: data.ans,
      lesson: data.lesson,
    };

    try {
      await axios.post("http://localhost:8081/api/quiz/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Quiz Added Successfully");
      setData({
        question: "",
        options: ["", "", "", ""],
        ans: "",
        lesson: null,
      });
    } catch (e) {
      console.error(e);
      alert("Error While adding Quiz");
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input type="text" id="question" name="question" onChange={handleChange} /><br />

        <label htmlFor="op1">Option 1:</label>
        <input type="text" id="op1" name="op1" onChange={handleChange} />

        <label htmlFor="op2">Option 2:</label>
        <input type="text" id="op2" name="op2" onChange={handleChange} /><br />

        <label htmlFor="op3">Option 3:</label>
        <input type="text" id="op3" name="op3" onChange={handleChange} />

        <label htmlFor="op4">Option 4:</label>
        <input type="text" id="op4" name="op4" onChange={handleChange} /><br />

        <label htmlFor="ans">Answer:</label>
        <input type="text" id="ans" name="ans" onChange={handleChange} /><br />

        <label htmlFor="lesson">Lesson Name:</label>
        <select id="lesson" name="lesson" onChange={handleChange}>
          <option value="">--Select Lesson--</option>
          {lessonData.map((lesson) => (
            <option key={lesson.id} value={lesson.title}>
              {lesson.title}
            </option>
          ))}
        </select><br />

        <input type="submit" value="Add Question" />
      </form>
    </div>
  );
};

export default AddQuiz;
