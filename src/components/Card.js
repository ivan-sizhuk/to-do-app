import { useTaskContext } from "../utilities/TaskContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressCircle from "./ProgressCircle";
import {
  faPenToSquare,
  faCheck,
  faCalendarAlt,
  faArrowUp,
  faCogs,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export const Card = ({ task }) => {
  const { completeTask } = useTaskContext();
  const handleCompleteTask = (event) => {
    event.preventDefault();
    event.stopPropagation();
    completeTask(task.id);
  };

  return (
    <Link to={`/taskdetails/${task.id}`}>
      <div className={!task.taskCompleted ? "card" : "card card-completed"}>
        {/* <div className="card"> */}
        <div className="card-left">
          <div className="card-header">
            <p>{task.task}</p>
          </div>
          <div className="card-info">
            <div className="card-info-line">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="card-info-icon"
              />
              <p>Date: {task.date}</p>
            </div>
            <div className="card-info-line">
              <FontAwesomeIcon icon={faClock} className="card-info-icon" />
              <p>Time: {task.time}</p>
            </div>
            <div className="card-info-line">
              <FontAwesomeIcon icon={faArrowUp} className="card-info-icon" />
              <p>Priority: {task.priority}</p>
            </div>
            <div className="card-info-line">
              <FontAwesomeIcon icon={faCogs} className="card-info-icon" />
              <p>Complexity: {task.complexity}</p>
            </div>
          </div>
          <div className="card-tags">
            <p>{task.tags}</p>
          </div>
        </div>
        <div className="card-right">
          <div className="card-edit">
            <div>
              <Link to={`/edittask/${task.id}`}>
                <button className="card-btn">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={handleCompleteTask}
                className={`${
                  task.taskCompleted ? "card-btn btn-completed" : "card-btn"
                }`}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
          <div className="card-progress">
            <ProgressCircle progress={task.progress} />
          </div>
        </div>
      </div>
    </Link>
  );
};
