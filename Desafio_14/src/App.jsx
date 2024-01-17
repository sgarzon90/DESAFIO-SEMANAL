import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "../src/app.scss";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    const addTask = (newTask) => {
        if (editTask) {
            updateTask(editTask.id, newTask.text);
            setEditTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }
    };

    const updateTask = (taskId, newText) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, text: newText } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        if (editTask && editTask.id === taskId) {
            setEditTask(null); 
        }
    };

    const toggleFavorite = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, favorite: !task.favorite } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="app-container">
            <h1>Gestor de tareas</h1>
            <TaskForm addTask={addTask} updateTask={updateTask} editTask={editTask} setEditTask={setEditTask}/>
            <TaskList tasks={tasks} deleteTask={deleteTask} toggleFavorite={toggleFavorite} setEditTask={setEditTask}/>
        </div>
    );
};

export default App;
