import { Button, Spinner, T } from "@admiral-ds/react-ui";
import { IoMdAdd } from "react-icons/io";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.css";
import { useState } from "react";
import TaskFilter from "@widgets/taskFilter";
import type { Task } from "@entities/task/model/TaskProps";
import { useGetTasksQuery } from "@features/taskManagement/api/tasksApi";
import { useNavigate } from "react-router";

export default function TaskList() {
  const navigate = useNavigate();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery();
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priority: "",
  });
  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };
  if (isTasksLoading) {
    return (
      <div className="modalWindow">
        <T as="h2" font="Main/XL">
          Loading tasks...
        </T>
        <Spinner dimension="xl" />
      </div>
    );
  }
  if (!tasks) {
    return (
      <T as="p" font="Main/XL" color="Error/Error 70">
        Error loading tasks. Try again.
      </T>
    );
  }
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
        <Button
          appearance="tertiary"
          dimension="l"
          onClick={() => navigate(`/task/new`)}
          iconEnd={<IoMdAdd size={20} />}
        >
          New Task
        </Button>
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
