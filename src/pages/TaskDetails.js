import { useTaskContext } from "../utilities/TaskContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPenToSquare,
  faRedo,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { CardDetails } from "../components/CardDetails";

export const TaskDetails = () => {
  const {
    taskList,
    deleteTask,
    deleteSubtask,
    completeSubtask,
    handleRepeatTask,
  } = useTaskContext();
  const { taskId } = useParams();
  const task = taskList.find((task) => task.id === taskId);

  const handleDelete = () => {
    deleteTask(taskId);
  };

  const handleSubtaskDelete = (subtaskId) => {
    deleteSubtask(taskId, subtaskId);
  };

  const handleSubtaskComplete = (subtaskId) => {
    completeSubtask(taskId, subtaskId);
  };

  return (
    <div className="task-details-wrapper">
      <div className="task-details-header">
        <div>
          <Link to="/">
            <button className="secondary-btn">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Link>
        </div>
        <h1 className="add-task-header-text">Task Details</h1>
        <div>
          <Link to={`/edittask/${taskId}`}>
            <button className="secondary-btn">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
        </div>
      </div>
      <CardDetails />
      <div className="subtask-con">
        <p>Checklist for subtasks</p>
        {task.subtaskList
          .filter((subtask) => !subtask.deleted)
          .map((subtask) => (
            <div
              className={
                subtask.completed ? "subtask-btn toggled-btn" : "subtask-btn"
              }
              key={subtask.id}
              onClick={() => handleSubtaskComplete(subtask.id)}
            >
              <button
                className="subtask-remove-btn"
                key={subtask.id}
                onClick={() => handleSubtaskDelete(subtask.id)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              {subtask.name}
            </div>
          ))}
      </div>
      <button
        onClick={() => handleRepeatTask(taskId)}
        className="btn-big task-repeat-delete-btn"
      >
        <FontAwesomeIcon icon={faRedo} />
        <span className="icon-left">Repeat Task</span>
      </button>
      <Link to="/">
        <button
          onClick={handleDelete}
          className="btn-big task-repeat-delete-btn"
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="icon-left">Delete Task</span>
        </button>
      </Link>
    </div>
  );
};
