import type { Task } from "./TaskProps";

export const initialNewTaskState: Task = {
  id: -1,
  title: "",
  description: "",
  category: "Bug",
  status: "To Do",
  priority: "High",
  deadline: "25.06.2025",
};
