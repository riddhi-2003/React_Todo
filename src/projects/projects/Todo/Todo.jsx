import { useState, useEffect } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setFormattedDate(`${date} - ${time}`);
        };

        updateDateTime(); 

        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!inputValue) return;

        if (tasks.some(task => task.text === inputValue)) {
            setInputValue("");
            return;
        }

        setTasks((prevTasks) => [...prevTasks, { text: inputValue, checked: false }]);
        setInputValue("");
    };

    const handleDeleteTodo = (value) => {
        const updatedTasks = tasks.filter(task => task.text !== value);
        setTasks(updatedTasks);
    };

    const handleClearTodoData = () => {
        setTasks([]);
    };

    const onHandleCheckedTodo = (index) => {
        const updatedTasks = tasks.map((task, idx) =>
            idx === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <h2 className="date-time">{formattedDate}</h2>
            </header>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue}
                            onChange={(event) => handleInputChange(event.target.value)}
                        />
                        <button type="submit" className="todo-btn">Add Task</button>
                    </div>
                </form>
            </section>
            <section className="myUnoderList">
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className={`todo-item ${task.checked ? 'checked' : ''}`}>
                            <span>{task.text}</span>
                            <button className="check-btn" onClick={() => onHandleCheckedTodo(index)}>
                                <MdCheck />
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteTodo(task.text)}>
                                <MdDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="clear-btn" onClick={handleClearTodoData}>Clear all</section>
        </section>
    );
};
