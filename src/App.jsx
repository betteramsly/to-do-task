import clsx from 'clsx'
import React, { useState } from 'react'

import { TaskItem } from './components/TaskItem/TaskItem'
import './scss/global.scss'
import styles from './scss/modal.module.scss'

const tasks = [
  {
    id: 1,
    description: 'Тестовое задание',
    checked: false,
  },
  {
    id: 2,
    description: 'Тестовое задание 2',
    checked: true,
  },
]

function App() {
  const [tasksData, setTasksData] = useState(tasks)
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all') // 'all' 'active' 'completed'

  const all = tasksData
  const active = tasksData.filter((item) => (item.checked ? false : true))
  const completed = tasksData.filter((item) => (item.checked ? true : false))

  const tasksTypes = {
    all,
    active,
    completed,
  }

  const selectedTasks = tasksTypes[filter]

  const addTask = () => {
    const newTask = {
      id: Math.random(),
      description: inputValue,
      checked: false,
    }
    setTasksData([...tasksData, newTask])
    setInputValue('')
  }

  return (
    <div className="wrapper">
      <h1 className="title">Todos</h1>
      <div className={styles.modal}>
        <input
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              addTask()
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          className={styles.taskInput}
          value={inputValue}
          placeholder="What needs to be done?"
          type="text"
        />
        <div className={styles.tasks}>
          {selectedTasks.map((item) => {
            return (
              <TaskItem
                key={item.id}
                id={item.id}
                description={item.description}
                checked={item.checked}
                setTasksData={setTasksData}
                tasks={tasksData}
              />
            )
          })}
        </div>
        <div className={styles.modalFooter}>
          <p className={styles.count}>{active.length} items left</p>
          <div className={styles.taskFilters}>
            <button
              onClick={() => setFilter('all')}
              className={clsx(styles.filterBtn, {
                [styles.active]: filter === 'all',
              })}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter('active')
              }}
              className={clsx(styles.filterBtn, {
                [styles.active]: filter === 'active',
              })}
            >
              Active
            </button>
            <button
              onClick={() => {
                setFilter('completed')
              }}
              className={clsx(styles.filterBtn, {
                [styles.active]: filter === 'completed',
              })}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => {
              setTasksData(active)
            }}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
