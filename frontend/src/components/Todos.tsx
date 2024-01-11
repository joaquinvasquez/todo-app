import { useEffect, useState, useContext } from 'react'
import { type TodoId } from '../types'
import Todo from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TodoContext from '../context/TodoContext'

const Todos: React.FC = () => {
  const [isEditing, setIsEditing] = useState<TodoId>('')
  const [parent] = useAutoAnimate()
  const { dispatch, filteredTodos } = useContext(TodoContext)

  useEffect(() => {
    dispatch({ type: 'INIT_TODOS' })
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
