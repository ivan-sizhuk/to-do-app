import React from "react";
import { useTaskContext } from "../utilities/TaskContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faArrowUp,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

export const CardDetails = () => {
  const { taskId } = useParams();
  const { taskList } = useTaskContext();
  const task = taskList.find((task) => task.id === taskId);

  const getColorFromProgress = (progress) => {
    const red = Math.round(255 - (120 * progress) / 100);
    const green = Math.round((220 * progress) / 100);
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const progressStyle = {
    width: `${task.progress}%`,
    backgroundColor: getColorFromProgress(task.progress),
    boxShadow: `0 0 5px ${getColorFromProgress(task.progress)}`,
  };

  return (
    <div className="card card-details">
      <div>
        <div className="card-header">
          <p>{task.task}</p>
        </div>
        <div className="card-info">
          <div className="card-info-line">
            <FontAwesomeIcon icon={faCalendarAlt} className="card-info-icon" />
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
        <div className="progress">
          <div className="progress-bar-container">
            <p className="progress-text">Progress: {task.progress}%</p>
            <div className="progress-bar" style={progressStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
