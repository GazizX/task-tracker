import { MenuButton, T } from "@admiral-ds/react-ui";
import type { TaskProps } from "../../types/TaskProps";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.css"
import { createRenderItems } from "../../utils/renderMenu";
import {tasks} from "../../mockData/tasks"
const itemsStatus = [
  {
    id: '1',
    display: 'To Do',
  },
  {
    id: '2',
    display: 'In Progress',
  },
  {
    id: '3',
    display: 'Done',
  }
];
const itemsPriority = [
  {
    id: '1',
    display: 'Low',
  },
  {
    id: '2',
    display: 'Medium',
  },
  {
    id: '3',
    display: 'High',
  }
];

const itemsCategory = [
  {
    id: '1',
    display: 'Bug',
  },
  {
    id: '2',
    display: 'Feature',
  },
  {
    id: '3',
    display: 'Documentation',
  },
  {
    id: '4',
    display: 'Refactor',
  },
  {
    id: '5',
    display: 'Test',
  }
];



export default function TaskList() {
    const StatusModel = createRenderItems(itemsStatus)
    const PriorityModel = createRenderItems(itemsPriority)
    const CategoryModel = createRenderItems(itemsCategory)
    return (
      <>
        <header>
          <T as="h1" font="Main/M">Track your tasks</T>
          <div className={styles.filterContainer}>
              <T as="h2" font="Header/H4">Filter</T>
              <MenuButton items={CategoryModel} dimension="s">
                by Category
              </MenuButton>
              <MenuButton items={StatusModel} dimension="s">
                by Status
              </MenuButton>
              <MenuButton items={PriorityModel} dimension="s">
                by Priority
              </MenuButton>
          </div>
        </header>
        <div className={styles.tasksGrid}>
        {
            tasks.map((task: TaskProps) => (
                <TaskItem key={task.id} task={task}/>
            ))
        }
        </div>
      </>
    )
}