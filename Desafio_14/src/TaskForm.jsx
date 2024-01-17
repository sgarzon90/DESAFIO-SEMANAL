import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../src/taskForm.scss";

const TaskForm = ({ addTask, updateTask, editTask, setEditTask }) => {
    const [taskText, setTaskText] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (editTask) {
            setTaskText(editTask.text);
            setIsEditMode(true);
        } else {
            setTaskText("");
            setIsEditMode(false);
        }
    }, [editTask]);

    const handleInputChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (isEditMode) {
            handleUpdateTask();
        } else {
            handleAddTask();
        }
    };

    const handleAddTask = () => {
        if (taskText.trim() !== "") {
            addTask({ id: Date.now(), text: taskText, favorite: false });
            setTaskText("");
        } else {
            alert("Por favor ingrese una tarea");
        }
    };

    const handleUpdateTask = () => {
        if (taskText.trim() !== "") {
            updateTask(editTask.id, taskText);
            setTaskText("");
            setIsEditMode(false);
            setEditTask(null);
        } else {
            alert("Por favor ingrese una tarea");
        }
    };

    const handleCancel = () => {
        setTaskText("");
        setIsEditMode(false);
        setEditTask(null);
    };

    return (
        <form className="task-form" onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Ingresar tarea"
                value={taskText}
                onChange={handleInputChange}
            />
            {isEditMode ? (
                <div>
                    <button type="submit">Modificar</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            ) : (
                <button type="submit">Agregar</button>
            )}
        </form>
    );
};

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    editTask: PropTypes.object,
    setEditTask: PropTypes.func.isRequired
};

export default TaskForm;

