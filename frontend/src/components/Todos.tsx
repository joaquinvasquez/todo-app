import { useEffect, useState, useContext } from 'react'
import Todo from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TodoContext from '../context/TodoContext'
import { type TodoId } from '../types'

const Todos: React.FC = () => {
  const [isEditing, setIsEditing] = useState<TodoId>('')
  const [parent] = useAutoAnimate()
  const { handleInitTodos, filteredTodos } = useContext(TodoContext)

  useEffect(() => {
    handleInitTodos()
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
