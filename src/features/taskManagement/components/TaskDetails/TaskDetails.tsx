import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { T, Button, TextField, SelectField } from "@admiral-ds/react-ui";
import styles from "./TaskDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@app/store/store";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@shared/constants/taskOptions";
import type { Task } from "@entities/task/model/TaskProps";
import { updateTask } from "../../store/taskSlice";
import { renderOptions } from "@shared/utils/render";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();
  const originalTask = tasks.find((task) => task.id.toString() === id);
  const [editableTask, setEditableTask] = useState(originalTask);
  const [errorValidate, setErrorValidate] = useState(false);

  useEffect(() => {
    setEditableTask(originalTask);
  }, [originalTask]);
  if (!originalTask || !editableTask) {
    return (
      <T as="h4" font="Header/H6">
        Error. Try again.
      </T>
    );
  }

  const handleChange = (field: keyof Task, value: string) => {
    setEditableTask((prev) => ({ ...prev!, [field]: value }));
    if (field === "title" && value !== "") {
      setErrorValidate(false);
    }
  };

  const handleSave = () => {
    if (editableTask.title === "") {
      setErrorValidate(true);
      return;
    }
    setErrorValidate(false);
    dispatch(
      updateTask({
        id: editableTask.id,
        updates: {
          title: editableTask.title,
          description: editableTask.description,
          category: editableTask.category,
          status: editableTask.status,
          priority: editableTask.priority,
        },
      }),
    );
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.card}>
      {errorValidate && (
        <T as="p" font="Additional/S" color="Error/Error 50">
          Заполните обязательные поля
        </T>
      )}
      <div className={styles.editField}>
        <TextField
          displayClearIcon
          required
          label="Title"
          value={editableTask.title}
          onChange={(e) => handleChange("title", e.target.value)}
          status={errorValidate ? "error" : undefined}
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
      <div className={styles.buttonGroup}>
        <Button onClick={handleSave} dimension="m">
          Save
        </Button>
        <Button dimension="m" appearance="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
