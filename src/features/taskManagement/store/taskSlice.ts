import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@entities/task/model/TaskProps";
import { initialTasks } from "../api/mocks/tasks";

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: initialTasks,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        updateTask: (state, action: PayloadAction<{id: number, updates: Partial<Task>}>) => {
            const {id, updates} = action.payload
            const existingTask = state.tasks.find(task => task.id === id)
            if (existingTask) {
                Object.assign(existingTask, updates)
            }
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
    },
})

export const {updateTask, addTask, deleteTask} = taskSlice.actions

export default taskSlice.reducer