import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { TaskProps } from "../../types/TaskProps"
import {tasks} from "../../mockData/tasks"
import styles from "./TaskDetails.module.css"
import { EditMode, T } from "@admiral-ds/react-ui"
export default function TaskDetails() {
    const {id} = useParams<{id: string}>()
    const [task, setTask] = useState<TaskProps | null>(null)
    useEffect(() => {
        const currentTask = tasks.find(t => t.id.toString() === id)
        if (currentTask) setTask(currentTask)
    }, [id])

    if (!task) {
        return <T as="h4" font="Header/H6">Error. Try again.</T>
    }
    
    return (
        <div className={styles.card}>
            <T className={styles.taskHeading} as="h4" font="Header/H6">{task.title}</T>
            <T className={styles.taskDescription} as="p" font="Caption/Caption 1">{task.description}</T>
        </div>
    )
}