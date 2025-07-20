import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router";
import {
  T,
  Button,
  TextField,
  SelectField,
  Spinner,
  DateField,
} from "@admiral-ds/react-ui";
import styles from "./TaskDetails.module.css";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@shared/constants/taskOptions";
import type { Task } from "@entities/task/model/TaskProps";
import { renderOptions } from "@shared/utils/render";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useAddTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@features/taskManagement/api/tasksApi";
import { initialNewTaskState } from "@entities/task/model/emptyTask";

export default function TaskDetails() {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined && id !== "new";
  const isCreateMode = id === undefined;
  const taskId = isEditMode && id ? parseInt(id, 10) : skipToken;
  const {
    data: originalTask,
    isLoading: isTaskLoading,
    error: taskError,
  } = useGetTaskByIdQuery(taskId);

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [editableTask, setEditableTask] = useState<Task>(initialNewTaskState);
  const [titleValidate, setTitleValidate] = useState(false);
  useEffect(() => {
    if (isEditMode && originalTask) {
      setEditableTask(originalTask);
    } else if (isCreateMode) {
      setEditableTask(initialNewTaskState);
    }
  }, [originalTask, isEditMode, isCreateMode]);

  if (isEditMode && isTaskLoading) {
    return (
      <div className="modalWindow">
        <T as="p" font="Main/XL">
          Loading task details...
        </T>
        <Spinner dimension="xl" />
      </div>
    );
  }

  if (isEditMode && taskError) {
    return (
      <T as="p" font="Main/XL" color="Error/Error 70">
        Error loading task. Try Again.
      </T>
    );
  }
  if (isEditMode && (!originalTask || !editableTask)) {
    return (
      <T as="h4" font="Header/H6" color="Error/Error 70">
        Error. Try again.
      </T>
    );
  }

  const handleChange = (field: keyof Task, value: string) => {
    setEditableTask((prev) => ({ ...prev!, [field]: value }));
    if (field === "title" && value !== "") {
      setTitleValidate(false);
    }
  };

  const handleSave = async () => {
    if (editableTask.title === "" || !editableTask.title) {
      setTitleValidate(true);
      return;
    }
    setTitleValidate(false);
    try {
      if (isEditMode && editableTask.id !== undefined) {
        await updateTask({
          id: editableTask.id,
          updates: {
            title: editableTask.title,
            description: editableTask.description,
            category: editableTask.category,
            status: editableTask.status,
            priority: editableTask.priority,
            deadline: editableTask.deadline,
          },
        }).unwrap();
      } else if (isCreateMode) {
        console.log(editableTask);
        await addTask({
          title: editableTask.title!,
          description: editableTask.description,
          category: editableTask.category!,
          status: editableTask.status!,
          priority: editableTask.priority!,
          deadline: editableTask.deadline!,
        }).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      {(isUpdating || isAdding) && (
        <div className="modalWindow">
          <T as="p" font="Main/XL">
            {isUpdating ? "Saving changes..." : "Creating task..."}
          </T>
          <Spinner dimension="xl"></Spinner>
        </div>
      )}
      <div className={styles.card}>
        {titleValidate && (
          <T as="p" font="Additional/S" color="Error/Error 50">
            Заполните обязательные поля корректно
          </T>
        )}
        <div className={styles.editField}>
          <TextField
            displayClearIcon
            required
            label="Title"
            value={editableTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
            status={titleValidate ? "error" : undefined}
          />
        </div>
        <div className={styles.editField}>
          <TextField
            displayClearIcon
            label="Description"
            value={editableTask.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className={styles.editMenu}>
          <SelectField
            required
            label="Category"
            value={editableTask.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange("category", e.target.value)
            }
          >
            {renderOptions(CATEGORY_OPTIONS)}
          </SelectField>
        </div>
        <div className={styles.editMenu}>
          <SelectField
            required
            label="Status"
            value={editableTask.status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange("status", e.target.value)
            }
          >
            {renderOptions(STATUS_OPTIONS)}
          </SelectField>
        </div>
        <div className={styles.editMenu}>
          <SelectField
            required
            label="Priority"
            value={editableTask.priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange("priority", e.target.value)
            }
          >
            {renderOptions(PRIORITY_OPTIONS)}
          </SelectField>
        </div>
        <div className={styles.editField}>
          <DateField
            required
            label="Deadline"
            placeholder={editableTask.deadline}
            value={editableTask.deadline}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("deadline", e.target.value)
            }
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={handleSave} dimension="m">
            Save
          </Button>
          <Button dimension="m" appearance="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
