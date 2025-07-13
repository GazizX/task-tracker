import { MenuButton, T } from "@admiral-ds/react-ui";
import type { TaskProps } from "../../types/TaskProps";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.css"
import { CategoryModel, itemsCategory, itemsPriority, itemsStatus, PriorityModel, StatusModel } from "../../utils/renderMenu";
import { useTasks } from "../../contexts/TaskContext";
import { useState } from "react";
import { getDisplayValue } from "../../utils/getDisplayValue";




export default function TaskList() {
    const {tasks} = useTasks()
    const [filters, setFilters] = useState({
      category: "",
      status: "",
      priority: ""
    });
    const handleFilterChange = (type: keyof typeof filters, value: string) => {
      setFilters(prev => ({ ...prev, [type]: value }));
    };

    const filteredTasks = tasks.filter(task => {
      return (
        (filters.category === "" || task.category === filters.category) &&
        (filters.status === "" || task.status === filters.status) &&
        (filters.priority === "" || task.priority === filters.priority)
      );
    });
    return (
      <>
        <header>
          <T as="h1" font="Main/M">Track your tasks</T>
          <div className={styles.filterContainer}>
              <T as="h2" font="Header/H4">Filter</T>
              <MenuButton items={CategoryModel} dimension="s"  onSelectItem={(id) => handleFilterChange('category', getDisplayValue(itemsCategory, id))}>
                {filters.category || "by Category"}
              </MenuButton>
              <MenuButton items={StatusModel} dimension="s" onSelectItem={(id) => handleFilterChange('status', getDisplayValue(itemsStatus, id))} >
                {filters.status || "by Status"}
              </MenuButton>
              <MenuButton items={PriorityModel} dimension="s" onSelectItem={(id) => handleFilterChange('priority', getDisplayValue(itemsPriority, id))}>
                {filters.priority || "by Priority"}
              </MenuButton>
          </div>
        </header>
        <div className={styles.tasksGrid}>
        {
            filteredTasks.map((task: TaskProps) => (
                <TaskItem key={task.id} task={task}/>
            ))
        }
        </div>
      </>
    )
}