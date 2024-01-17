import PropTypes from "prop-types";
import { useState } from "react";
import "../src/taskList.scss";
import favoriteIcon from "../src/images/favorite.png";
import notFavoriteIcon from "../src/images/nofavorite.png";

const TaskList = ({ tasks, deleteTask, toggleFavorite, setEditTask }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleTaskClick = (task) => {
        setEditTask(task);
        setSelectedTaskId(task.id);
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className={selectedTaskId === task.id ? "selected-task" : ""}
                >
                    {task.text}
                    <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    <button
                        onClick={() => toggleFavorite(task.id)}
                        className={task.favorite ? "favorite-button" : ""}
                    >
                        <img
                            src={task.favorite ? favoriteIcon : notFavoriteIcon}
                            alt={task.favorite ? "Favorito" : "No favorito"}
                            className="favorite-icon"
                        />
                    </button>
                </li>
            ))}
        </ul>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    setEditTask: PropTypes.func.isRequired,
};

export default TaskList;