import { ChangeEvent, useState, FormEvent } from 'react'
import TodoListItem from './components/TodoListItem'
import { useAppSelector, useAppDispatch } from './hooks'
import { TodoContext } from './types/index'
import { createTodo, deleteTodo, toggleDoneState, updateTodo, markAllAsUndone } from './redux/features/todos'
import EditIcon from "./assets/icons/edit.svg?react";
import './App.scss'

function App() {
  const [todo_input, setTodoInput] = useState('')
  const [current_edit, setCurrentEdit] = useState<TodoContext | null>(null)
  const todos = useAppSelector((state) => state.todos.todos)
  const dispatch = useAppDispatch()

  // Functions
  const handleChange = (event: ChangeEvent) => {
    setTodoInput((event.target as HTMLInputElement).value)
  }

  const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (current_edit?.id) {
      dispatch(updateTodo(todo_input))
      setTodoInput('')
      setCurrentEdit(null)
    }

    else if (todo_input.length > 5) {
      dispatch(createTodo({ id: generateId(), task: todo_input, done: false }))
      setTodoInput('')
    } else {
      alert('Task must have at least 5 characters')
      return
    }
  }

  const handleRemoveTodo = (id: string) => {
    dispatch(deleteTodo(id))
    setCurrentEdit(null)

  }

  const handleToggleTodoState = (id: string) => {
    dispatch(toggleDoneState(id))
  }

  const handleEdit = (val: TodoContext) => {
    setTodoInput(val.task)
    setCurrentEdit(val)
  }

  const todoAnalytics = () => {
    const completed = todos.filter(t => t.done).length
    const completed_percent = todos.length === 0 ? `${0}%` : `${completed / todos.length * 100}%`
    const is_some_todo_done = todos.some(t => t.done)
    return { completed, completed_percent, is_some_todo_done }
  }

  const handleMarkAllAsUndone = () => {
    dispatch(markAllAsUndone())
  }


  return (
    <div className='container'>
      <h1 className="header">todolist</h1>

      <form className='form-container' onSubmit={handleSubmit}>
        <div className="input-submit-btn">
          <input type="text" value={todo_input} className='todo-input' placeholder="Enter your todo's here" onChange={handleChange} />
          <button type="submit" className='submit-todo-btn'>
            {current_edit?.id ? <EditIcon /> : '+'}
          </button>
        </div>

        <div className="todos">
          {
            todos.map(({ id, task, done }) =>
              <TodoListItem
                key={id} task={task}
                done={done}
                handleRemoveTodo={() => handleRemoveTodo(id)}
                handleToggleTodoState={() => handleToggleTodoState(id)}
                handleEdit={() => handleEdit({ id, task, done })}
              />)
          }
        </div>

        <div className="footer">
          <div className="progress">
            <span className="progress-text">{todoAnalytics().completed} of {todos.length} tasks done</span>
            <span className="progress-bar" style={{ width: todoAnalytics().completed_percent }}></span>
          </div>
          <button
            type="button"
            className='remove-checked'
            disabled={!todoAnalytics().is_some_todo_done}
            onClick={handleMarkAllAsUndone}
          >
            Remove Checked
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
