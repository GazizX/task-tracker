import {
  Button,
  Modal,
  ModalButtonPanel,
  ModalTitle,
  T,
  Tag,
} from "@admiral-ds/react-ui";
import type { Task } from "@entities/task/model/TaskProps";
import styles from "./TaskItem.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  CATEGORY_COLORS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../../ui/colors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteTaskMutation } from "@features/taskManagement/api/tasksApi";

export interface TaskItemProps {
  task: Task;
}

export default function TaskItem(task: TaskItemProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const data = task.task;

  const [deleteTask] = useDeleteTaskMutation();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    closeDeleteModal();
    try {
      await deleteTask(data.id).unwrap();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className={styles.card}>
      <T className={styles.taskHeading} as="h4" font="Header/H6">
        {data.title}
      </T>
      <T className={styles.taskDescription} as="p" font="Caption/Caption 1">
        {data.description}
      </T>
      <div className={styles.flexContainer}>
        <div className={styles.fieldContainer}>
          <T as="span" font="Additional/XS" className={styles.textField}>
            Category:
          </T>
          <Tag
            kind={{
              background: CATEGORY_COLORS[data.category],
            }}
          >
            <T as="span" font="Additional/XS">
              {data.category}
            </T>
          </Tag>
        </div>
        <div className={styles.fieldContainer}>
          <T as="span" font="Additional/XS" className={styles.textField}>
            Status:
          </T>
          <Tag
            statusViaBackground={true}
            kind={{
              background: STATUS_COLORS[data.status].base,
              border: STATUS_COLORS[data.status].border,
            }}
          >
            <T as="span" font="Additional/XS">
              {data.status}
            </T>
          </Tag>
        </div>
        <div className={styles.fieldContainer}>
          <T as="span" font="Additional/XS" className={styles.textField}>
            Priority:
          </T>
          <Tag
            statusViaBackground={true}
            kind={{
              background: PRIORITY_COLORS[data.priority].base,
              border: PRIORITY_COLORS[data.priority].border,
            }}
          >
            <T as="span" font="Additional/XS">
              {data.priority}
            </T>
          </Tag>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          className={styles.taskButton}
          appearance="tertiary"
          dimension="xl"
          onClick={() => navigate(`/task/${data.id}`)}
          iconStart={<FaEdit size={20} />}
          displayAsSquare
        />
        <T as="p" font="Main/XS">
          🔥{data.deadline}🔥
        </T>
        <Button
          className={styles.taskButton}
          appearance="tertiary"
          dimension="xl"
          onClick={openDeleteModal}
          iconStart={<MdDelete size={20} />}
          displayAsSquare
        />
      </div>
      {isDeleteModalOpen && (
        <Modal onClose={closeDeleteModal}>
          <ModalTitle>Do you want to delete this task?</ModalTitle>
          <ModalButtonPanel>
            <Button appearance="primary" dimension="m" onClick={confirmDelete}>
              Yes
            </Button>
            <Button
              appearance="secondary"
              dimension="m"
              onClick={closeDeleteModal}
            >
              No
            </Button>
          </ModalButtonPanel>
        </Modal>
      )}
    </div>
  );
}
