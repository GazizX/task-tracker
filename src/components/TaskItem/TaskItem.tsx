import { Button, T, Tag } from "@admiral-ds/react-ui";
import type {TaskProps} from "../../types/TaskProps";
import styles from './TaskItem.module.css'
import { CATEGORY_COLORS, PRIORITY_COLORS, STATUS_COLORS } from "../../constants/colors";
import { useNavigate } from "react-router-dom";

export interface TaskItemProps {
    task: TaskProps;
}

export default function TaskItem(task : TaskItemProps) {
    const navigate = useNavigate()
    const data = task.task
    return (
        <div className={styles.card}>
            <T className={styles.taskHeading} as="h4" font="Header/H6">{data.title}</T>
            <T className={styles.taskDescription} as="p" font="Caption/Caption 1">{data.description}</T>
            <div className={styles.flexContainer}>
                <div className={styles.fieldContainer}>
                    <T as="span" font="Additional/XS" className={styles.textField}>Category:</T>
                    <Tag 
                        kind={{
                            background: CATEGORY_COLORS[data.category]
                        }}
                    >
                        <T as="span" font="Additional/XS">{data.category}</T>
                    </Tag>
                </div>
                <div className={styles.fieldContainer}>
                    <T as="span" font="Additional/XS" className={styles.textField}>Status:</T>
                    <Tag
                        statusViaBackground={true}
                        kind={{
                            background: STATUS_COLORS[data.status].base,
                            border: STATUS_COLORS[data.status].border
                        }}
                    >
                        <T as="span" font="Additional/XS">{data.status}</T>
                    </Tag>
                </div>
                <div className={styles.fieldContainer}>
                    <T as="span" font="Additional/XS" className={styles.textField}>Priority:</T>
                    <Tag 
                        statusViaBackground={true}
                        kind={{
                            background: PRIORITY_COLORS[data.priority].base,
                            border: PRIORITY_COLORS[data.priority].border
                        }}
                    >
                        <T as="span" font="Additional/XS">{data.priority}</T>
                    </Tag>
                </div>
            </div>
            <Button className={styles.editButton} appearance="tertiary" dimension="m" onClick={() => navigate(`/task/${data.id}`)}>
                Edit
            </Button>
        </div>
    )
}