import { createContext, useContext, useState } from "react";
import type { TaskProps } from "../types/TaskProps";
import {initialTasks} from "../mockData/tasks"
type TaskContextType = {
    tasks: TaskProps[]
    getTaskById: (id: string) => TaskProps | undefined
    updateTask: (id: number, updates: Partial<TaskProps>) => void
}

const TasksContext = createContext<TaskContextType>({
    tasks: [],
    getTaskById: () => undefined,
    updateTask: () => {}
})

type TasksProviderProps = {
    children: React.ReactNode
}

export const TasksProvider = ({children} : TasksProviderProps) => {
    const [tasks, setTasks] = useState<TaskProps[]>(initialTasks)
    const getTaskById = (id: string) => tasks.find(task => task.id.toString() === id)
    const updateTask = (id: number, updates: Partial<TaskProps>) => {
        setTasks(prevTasks => 
            prevTasks.map(task =>
                task.id === id ? {...task, ...updates} : task
            )
        )
    }

    return (
        <TasksContext.Provider value={{tasks, getTaskById, updateTask}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)