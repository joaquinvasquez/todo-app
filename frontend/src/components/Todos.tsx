import { useEffect, useState, useContext } from 'react'
import { type TodoId } from '../types'
import Todo from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TodoContext from '../context/TodoContext'

const Todos: React.FC = () => {
  const [isEditing, setIsEditing] = useState<TodoId>('')
  const [parent] = useAutoAnimate()
  const { dispatch, filteredTodos } = useContext(TodoContext)

  const getTodos = async (): Promise<void> => {
    const response = await fetch('http://localhost:3030/todos')
    return await response.json()
  }

  useEffect(() => {
    getTodos()
      .then((data) => {
        dispatch({ type: 'INIT_TODOS', payload: data })
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <ul className="todo-list" ref={parent}>
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo.id ? 'editing' : ''}
          `}
          onDoubleClick={() => {
            setIsEditing(todo.id)
          }}
        >
          <Todo data={todo} isEditing={isEditing} setIsEditing={setIsEditing} />
        </li>
      ))}
    </ul>
  )
}

export default Todos
