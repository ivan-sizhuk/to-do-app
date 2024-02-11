import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import { Home } from "./pages/Home";
import { AddTask } from "./pages/AddTask";
import { TaskDetails } from "./pages/TaskDetails";
import { EditTask } from "./pages/EditTask";
import { TaskProvider } from "./utilities/TaskContext";

export default function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/taskdetails/:taskId" element={<TaskDetails />} />
            <Route path="/edittask/:taskId" element={<EditTask />} />
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}
