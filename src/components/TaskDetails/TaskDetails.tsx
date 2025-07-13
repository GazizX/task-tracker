import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { EditMode, MenuButton, T, Button } from "@admiral-ds/react-ui";
import { useTasks } from "../../contexts/TaskContext";
import { 
  CategoryModel, 
  StatusModel, 
  PriorityModel, 
  itemsCategory, 
  itemsStatus, 
  itemsPriority 
} from "../../utils/renderMenu";
import styles from "./TaskDetails.module.css";
import { getDisplayValue } from "../../utils/getDisplayValue";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTasks();
  const originalTask = getTaskById(id || "");
  const [editableTask, setEditableTask] = useState(originalTask);
  
  if (!originalTask || !editableTask) {
    return <T as="h4" font="Header/H6">Error. Try again.</T>;
  }

  const handleChange = (field: keyof typeof originalTask, value: string) => {
    setEditableTask(prev => ({ ...prev!, [field]: value }));
  };

  const handleSave = () => {
    updateTask(editableTask.id, {
      title: editableTask.title,
      description: editableTask.description,
      category: editableTask.category,
      status: editableTask.status,
      priority: editableTask.priority
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.card}>
      <div className={styles.editField}>
        <T as="span" font="Additional/XS">Title:</T>
        <EditMode
          placeholder="Title"
          value={editableTask.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className={styles.editField}>
        <T as="span" font="Additional/XS">Description:</T>
        <EditMode
          placeholder="Description"
          value={editableTask.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className={styles.editMenu}>
        <T as="span" font="Additional/XS">Category:</T>
        <MenuButton 
          items={CategoryModel} 
          dimension="s"
          onSelectItem={(id) => {
            handleChange('category', getDisplayValue(itemsCategory, id));
          }}
        >
          {editableTask.category}
        </MenuButton>
      </div>

      <div className={styles.editMenu}>
        <T as="span" font="Additional/XS">Status:</T>
        <MenuButton 
          items={StatusModel} 
          dimension="s"
          onSelectItem={(id) => {
            handleChange('status', getDisplayValue(itemsStatus, id));
          }}
        >
          {editableTask.status}
        </MenuButton>
      </div>

      <div className={styles.editMenu}>
        <T as="span" font="Additional/XS">Priority:</T>
        <MenuButton 
          items={PriorityModel} 
          dimension="s"
          onSelectItem={(id) => {
            handleChange('priority', getDisplayValue(itemsPriority, id));
          }}
        >
          {editableTask.priority}
        </MenuButton>
      </div>

      <div className={styles.buttonGroup}>
        <Button onClick={handleSave} dimension="m">Save</Button>
        <Button dimension="m" appearance="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}