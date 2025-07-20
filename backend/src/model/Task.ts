export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";
export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  deadline: string;
}

export let tasks: Task[] = [{
    id: 1,
    title: "Исправить критическую ошибку входа",
    description: "При вводе неверного пароля система падает",
    category: "Bug",
    status: "In Progress",
    priority: "High",
    deadline: "25.06.2025"
  },
  {
    id: 2,
    title: "Добавить темную тему",
    description: "Реализовать переключение между светлой и темной темой",
    category: "Feature",
    status: "To Do",
    priority: "Medium",
    deadline: "26.06.2025"
  },
  {
    id: 3,
    title: "Обновить документацию API",
    description: "Добавить примеры для новых эндпоинтов",
    category: "Documentation",
    status: "Done",
    priority: "Low",
    deadline: "30.06.2025"
  },
  {
    id: 4,
    title: "Оптимизировать работу с базой данных",
    description: "Переписать медленные запросы",
    category: "Refactor",
    status: "In Progress",
    priority: "High",
    deadline: "21.06.2025"
  },];