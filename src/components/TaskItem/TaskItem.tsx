import clsx from 'clsx'
import React from 'react'
import { Task } from '../../App'

import styles from './TaskItem.module.scss'

type TasksItemProps = {
  key?: string
  id?: number
  description?: string
  checked?: boolean
  setTasksData?: (tasks: Task[]) => void
  tasks?: Task[]
}

export const TaskItem: React.FC<TasksItemProps> = (props) => {
  const checkTask = () => {
    const newTasks = props.tasks.map((item) => {
      return item.id === props.id ? { ...item, checked: !item.checked } : item
    })
    props.setTasksData(newTasks)
  }
  return (
    <div
      className={clsx(styles.taskItem, {
        [styles.checked]: props.checked,
      })}
    >
      <button onClick={checkTask} className={styles.checkbox}>
        {props.checked && (
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="DoneIcon"
          >
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
          </svg>
        )}
      </button>
      <p>{props.description}</p>
    </div>
  )
}
