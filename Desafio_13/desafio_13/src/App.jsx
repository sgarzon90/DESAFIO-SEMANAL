import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "../src/app.scss";

const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <div className="app-container">
            <h1>Gestor de tareas</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
};

export default App;
