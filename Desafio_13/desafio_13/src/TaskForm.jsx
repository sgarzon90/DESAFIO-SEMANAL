import { useState } from "react";
import PropTypes from "prop-types";
import "../src/taskForm.scss";

const TaskForm = ({ addTask }) => {
    const [taskText, setTaskText] = useState("");

    const handleInputChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskText.trim() !== "") {
            addTask({ id: Date.now(), text: taskText });
            setTaskText("");
        } else {
            alert("Por favor ingrese una tarea");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ingresar tarea"
                value={taskText}
                onChange={handleInputChange}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TaskForm;

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
};

