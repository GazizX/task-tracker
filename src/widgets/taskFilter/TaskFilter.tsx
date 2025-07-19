import { T, SelectField, Option } from "@admiral-ds/react-ui"
import type { ChangeEvent } from "react"
import { CATEGORY_OPTIONS, STATUS_OPTIONS, PRIORITY_OPTIONS } from "@shared/constants/taskOptions"
import { renderOptions } from "@shared/utils/render"
import styles from './TaskFilter.module.css'
interface TaskFilterProps {
    filters: {
        category: string,
        status: string,
        priority: string,
    },
    onFilterChange: (type: keyof TaskFilterProps['filters'], value: string) => void
}

export default function TaskFilter({filters, onFilterChange} : TaskFilterProps) {
    const handleFilterChange = (type: keyof TaskFilterProps['filters'], e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(type, e.target.value)
    }

    return (
        <div className={styles.filterContainer}>
              <T as="h2" font="Header/H5">Filter</T>
              <SelectField
                className={styles.selectField}
                displayClearIcon
                value={filters.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange('category', e)}>
                  <Option key="" value="">All Categories</Option>
                {renderOptions(CATEGORY_OPTIONS)}
              </SelectField>
              <SelectField
                className={styles.selectField}
                displayClearIcon
                value={filters.status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange('status', e)}>
                  <Option key="" value="">All Statuses</Option>
                {renderOptions(STATUS_OPTIONS)}
              </SelectField>
              <SelectField
                className={styles.selectField}
                displayClearIcon
                value={filters.priority}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange('priority', e)}>
                  <Option key="" value="">All Priorities</Option>
                {renderOptions(PRIORITY_OPTIONS)}
              </SelectField>
          </div>
    )
}