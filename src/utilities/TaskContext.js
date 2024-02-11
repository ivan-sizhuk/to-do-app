import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  return context;
};

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("taskList");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const calculateProgress = (subtaskList) => {
    const activeSubtasks = subtaskList.filter((subtask) => !subtask.deleted);
    const totalActiveSubtasks = activeSubtasks.length;

    if (totalActiveSubtasks === 0) {
      return 0;
    }

    const completedSubtasks = activeSubtasks.filter(
      (subtask) => subtask.completed
    ).length;

    return Math.round((completedSubtasks / totalActiveSubtasks) * 100);
  };

  const addTask = (newTask) => {
    const newTaskWithId = {
      ...newTask,
      id: uuidv4(),
      progress: calculateProgress(newTask.subtaskList),
    };
    setTaskList((prevList) => [...prevList, newTaskWithId]);
  };

  const completeTask = (taskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId
          ? {
              ...task,
              taskCompleted: !task.taskCompleted,
            }
          : task
      )
    );
  };

  const editTask = (editedTaskList) => {
    setTaskList(editedTaskList);
  };

  const deleteTask = (taskId) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  const updateSubtasksAndProgress = (task, subtaskId, updates) => {
    return {
      ...task,
      subtaskList: task.subtaskList.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
      ),
      progress: calculateProgress(
        task.subtaskList.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
        )
      ),
    };
  };

  const completeSubtask = (taskId, subtaskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId
          ? updateSubtasksAndProgress(task, subtaskId, {
              completed: !task.subtaskList.find(
                (subtask) => subtask.id === subtaskId
              ).completed,
            })
          : task
      )
    );
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId
          ? updateSubtasksAndProgress(task, subtaskId, { deleted: true })
          : task
      )
    );
  };

  const handleRepeatTask = (taskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtaskList: task.subtaskList.map((subtask) => ({
                ...subtask,
                completed: false,
                deleted: false,
              })),
              progress: calculateProgress(
                task.subtaskList.map((subtask) => ({
                  ...subtask,
                  completed: false,
                  deleted: false,
                }))
              ),
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        addTask,
        editTask,
        deleteTask,
        deleteSubtask,
        completeSubtask,
        handleRepeatTask,
        completeTask,
        calculateProgress,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
