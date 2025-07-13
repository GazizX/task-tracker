
import { Route, Routes } from "react-router";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import { TasksProvider } from "./contexts/TaskContext";


function App() {
  return (
    <TasksProvider>
      <Routes>
        <Route path="/" element={<TaskList/>}/>
        <Route path="/task/:id" element={<TaskDetails/>}/>
      </Routes>
    </TasksProvider>
  )
}

export default App
