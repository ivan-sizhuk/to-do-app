import React, { useState, useEffect } from "react";
import { useTaskContext } from "../utilities/TaskContext";
import { Link } from "react-router-dom";
import { CardList } from "../components/CardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPowerOff } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { taskList, setTaskList } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Default");
  const [filterOption, setFilterOption] = useState("");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [originalTaskList, setOriginalTaskList] = useState([]);
  const [isPowerModeOn, setIsPowerModeOn] = useState(false);
  const sortOptions = [
    "Default",
    "Ascending Date",
    "Descending Date",
    "Ascending Complexity",
    "Descending Complexity",
    "Ascending Priority",
    "Descending Priority",
  ];

  useEffect(() => {
    const copiedTaskList = JSON.parse(JSON.stringify(taskList));
    setOriginalTaskList(copiedTaskList);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePowerModeClick = () => {
    setIsPowerModeOn((prevState) => !prevState);

    if (!isPowerModeOn) {
      const sums = taskList.map((task) => ({
        id: task.id,
        sum: task.complexity + task.priority,
      }));
      const maxSum = Math.max(...sums.map((task) => task.sum));
      const tasksWithMaxSum = taskList.filter(
        (task) => task.complexity + task.priority === maxSum
      );
      const taskWithMaxPriority = tasksWithMaxSum.reduce(
        (prevTask, currentTask) =>
          prevTask.priority > currentTask.priority ? prevTask : currentTask
      );
      setTaskList([taskWithMaxPriority]);
    } else {
      setTaskList(originalTaskList);
    }
  };

  const handleSortOptionClick = (option) => {
    if (option === sortOption) {
      setSortOption("Default");
    } else {
      setSortOption(option);
    }
    applySort(option);
  };

  const handleFilterOptionClick = (option) => {
    setFilterOption(option);
  };

  const applySort = (option) => {
    let sortedTasks = [...taskList];

    if (option === "Default") {
      setTaskList([...originalTaskList]);
      return;
    } else if (option === "Ascending Date") {
      sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "Descending Date") {
      sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "Ascending Complexity") {
      sortedTasks.sort((a, b) => a.complexity - b.complexity);
    } else if (option === "Descending Complexity") {
      sortedTasks.sort((a, b) => b.complexity - a.complexity);
    } else if (option === "Ascending Priority") {
      sortedTasks.sort((a, b) => a.priority - b.priority);
    } else if (option === "Descending Priority") {
      sortedTasks.sort((a, b) => b.priority - a.priority);
    }
    setTaskList(sortedTasks);
  };

  const renderSortOptions = () => {
    return (
      <div className="dropdown-content">
        {sortOptions.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={sortOption === option}
              onChange={() => handleSortOptionClick(option)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };

  const renderFilterOptions = () => {
    const uniqueTags = [...new Set(taskList.map((task) => task.tags))];

    return (
      <div className="dropdown-content">
        <label key="showAll">
          <input
            type="radio"
            value=""
            checked={!filterOption}
            onChange={() => {
              handleFilterOptionClick("");
            }}
          />
          Show All
        </label>
        {uniqueTags.map((tag) => (
          <label key={tag}>
            <input
              type="radio"
              value={tag}
              checked={filterOption === tag}
              onChange={() => {
                handleFilterOptionClick(tag);
              }}
            />
            {tag}
          </label>
        ))}
      </div>
    );
  };
  return (
    <div className="home-wrapper">
      <input
        onChange={handleSearch}
        className="input-text"
        type="text"
        placeholder="Search"
      />
      <div className="sort-filter-container">
        <div className="dropdown">
          <button
            className="btn-big btn-sort-filter"
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
          >
            <span className="icon-right">Sort</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={isSortDropdownOpen ? "rotate-open" : "rotate-close"}
            />
          </button>
          {isSortDropdownOpen && renderSortOptions()}
        </div>
        <div className="power-mode-btn-con">
          <button
            onClick={handlePowerModeClick}
            className={
              isPowerModeOn
                ? "btn-big power-mode-btn power-mode-btn-active"
                : "btn-big power-mode-btn"
            }
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
        <div className="dropdown">
          <button
            className="btn-big btn-sort-filter"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <span className="icon-right">Filter</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={isFilterDropdownOpen ? "rotate-open" : "rotate-close"}
            />
          </button>
          {isFilterDropdownOpen && renderFilterOptions()}
        </div>
      </div>
      <CardList
        tasks={
          filterOption
            ? taskList.filter((task) => task.tags === filterOption)
            : taskList.filter((task) =>
                task.task.toLowerCase().includes(searchTerm.toLowerCase())
              )
        }
      />
      <Link to="/addtask">
        <button className="btn-big">Add New Task</button>
      </Link>
    </div>
  );
};
