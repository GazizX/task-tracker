import type { Category, Priority, Status } from "../../../entities/task/model/TaskProps";

type ColorVariant = {
  base: string;
  border: string;
};

export const PRIORITY_COLORS: Record<Priority, ColorVariant> = {
    'High': {
        base:'#ff000065',
        border: '#cf0202ff'
    },
    'Medium': {
        base: '#ffcc00a2',
        border: '#d3a900ff'
    },
    'Low': {
        base: '#00ff9da5',
        border: '#00ca8dff'
    }
} as const;

export const STATUS_COLORS: Record<Status, ColorVariant> = {
    'To Do': {
        base:'#bbff0092',
        border: '#91c50292'
    },
    'In Progress': {
        base: '#bf00ffa2',
        border: '#8a00b8a2'
    },
    'Done': {
        base: '#00ff00a5',
        border: '#00ca00ff'
    }
} as const;

export const CATEGORY_COLORS: Record<Category, string> = {
    'Bug': '#ff4747',
    'Feature': '#64b5f6',
    'Documentation': '#7ed321',
    'Refactor': '#ab47ff',
    'Test': '#ffa726'
} as const;

