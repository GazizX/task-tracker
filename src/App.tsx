
import { Route, Routes } from "react-router";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskList/>}/>
      <Route path="/task/:id" element={<TaskDetails/>}/>
    </Routes>
  )
}

export default App
