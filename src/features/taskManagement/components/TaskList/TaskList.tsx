import { T } from "@admiral-ds/react-ui";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store";
import TaskFilter from "@widgets/taskFilter";
import type { Task } from "@entities/task/model/TaskProps";

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priority: "",
  });
  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.category === "" || task.category === filters.category) &&
      (filters.status === "" || task.status === filters.status) &&
      (filters.priority === "" || task.priority === filters.priority)
    );
  });
  return (
    <>
      <header>
        <T as="h1" font="Header/HL3">
          Track your tasks
        </T>
        <TaskFilter onFilterChange={handleFilterChange} filters={filters} />
      </header>
      <div className={styles.tasksGrid}>
        {filteredTasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
