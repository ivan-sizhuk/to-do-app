import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../utilities/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const AddTask = () => {
  const { taskList, addTask } = useTaskContext();
  const { taskCompleted, setTaskCompleted } = useState(false);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtaskList, setSubtaskList] = useState([]);
  const [subtaskError, setSubtaskError] = useState(false);
  const [tags, setTags] = useState("");

  const radioInput = (name, state, stateSetter) => {
    return Array.from({ length: 10 }, (_, index) => (
      <label key={index + 1}>
        <input
          type="radio"
          name={name}
          value={index + 1}
          key={index + 1}
          checked={state === index + 1}
          onChange={() => stateSetter(index + 1)}
        />
        {index + 1}
      </label>
    ));
  };

  const dateTimeInput = (name, state, stateSetter) => {
    return (
      <input
        className="input-text"
        type={name}
        name={name}
        value={state}
        onChange={(e) => stateSetter(e.target.value)}
      />
    );
  };

  const handleChange = useCallback((e, stateSetter) => {
    stateSetter(e.target.value);
  }, []);

  const subtaskHandleSubmit = (e) => {
    e.preventDefault();
    const trimmedSubtask = subtaskInput.trim();
    if (trimmedSubtask.length > 0) {
      const newSubtask = {
        id: uuidv4(),
        name: trimmedSubtask,
        completed: false,
        deleted: false,
      };
      setSubtaskList((prevSubtasks) => [...prevSubtasks, newSubtask]);
      setSubtaskInput("");
      setSubtaskError(false);
    } else {
      setSubtaskError(true);
      setTimeout(() => {
        setSubtaskError(false);
      }, 2000);
    }
  };

  const handleRemove = (subtaskId) => {
    const newList = subtaskList.filter((subtask) => subtask.id !== subtaskId);
    setSubtaskList(newList);
  };

  const saveTask = () => {
    const newTask = {
      task,
      taskCompleted,
      priority,
      complexity,
      date,
      time,
      subtaskList,
      tags,
    };
    addTask(newTask);
  };
  return (
    <div className="add-task-wrapper">
      <div className="add-task-header">
        <Link to="/">
          <button className="btn-back">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <h1 className="add-task-header-text">Add New Task</h1>
      </div>
      <div className="task-details">
        <h2>Task Name</h2>
        <input
          className="input-text"
          type="text"
          placeholder="Enter task..."
          onChange={(e) => handleChange(e, setTask)}
        />
      </div>
      <div className="task-details">
        <h2>Select Priority Level</h2>
        <div className="radio-input">
          {radioInput("priority", priority, setPriority)}
        </div>
      </div>
      <div className="task-details">
        <h2>Select Complexity Level</h2>
        <div className="radio-input">
          {radioInput("complexity", complexity, setComplexity)}
        </div>
      </div>
      <div className="date-time-input">
        <div className="date-time-con">
          <h2>Select Due Date</h2>
          <div>{dateTimeInput("date", date, setDate)}</div>
        </div>
        <div>
          <h2>Select Time</h2>
          <div>{dateTimeInput("time", time, setTime)}</div>
        </div>
      </div>
      <div className="task-details">
        <h2>Add Subtasks</h2>
        <form onSubmit={subtaskHandleSubmit}>
          <input
            className="input-text"
            type="text"
            name="subtask"
            placeholder="Enter subtask..."
            value={subtaskInput}
            onChange={(e) => handleChange(e, setSubtaskInput)}
          />
          <button className="submit-remove-input-btn" type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      </div>
      {subtaskError && <p>Subtask input can't be empty</p>}
      {subtaskList.length > 0 && (
        <ul className="task-details">
          {subtaskList.map((subtask) => (
            <li key={subtask.id}>
              <input
                className="input-text"
                type="text"
                name="subtask"
                value={subtask.name}
                onChange={(e) =>
                  handleChange(e, (newValue) => {
                    const newSubtasks = subtaskList.map((s) =>
                      s.id === subtask.id ? { ...s, name: newValue } : s
                    );
                    setSubtaskList(newSubtasks);
                  })
                }
              />
              <button
                className="submit-remove-input-btn"
                onClick={() => {
                  handleRemove(subtask.id);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="task-details">
        <h2>Add Tag</h2>
        <input
          className="input-text"
          type="text"
          placeholder="Enter tag..."
          onChange={(e) => handleChange(e, setTags)}
        />
      </div>
      <Link to="/">
        <button onClick={saveTask} className="btn-big">
          Save Task
        </button>
      </Link>
    </div>
  );
};
