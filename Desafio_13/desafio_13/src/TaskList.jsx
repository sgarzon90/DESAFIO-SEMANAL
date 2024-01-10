import PropTypes from "prop-types";
import "../src/taskList.scss";

const TaskList = ({ tasks, deleteTask }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.text}
                    <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    deleteTask: PropTypes.func.isRequired,
};
