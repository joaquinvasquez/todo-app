import { useEffect, useState, useContext } from 'react'
import Todo from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TodoContext from '../context/TodoContext'
import DragAndDropContext from '../context/DragAndDropContext'
import { type TodoId } from '../types'

const Todos: React.FC = () => {
  const [isEditing, setIsEditing] = useState<TodoId>('')
  const [parent] = useAutoAnimate()
  const { handleInitTodos, filteredTodos } = useContext(TodoContext)
  const { handleDragStart, handleDragOver, handleDragEnd, handleDrop } =
    useContext(DragAndDropContext)

  useEffect(() => {
    handleInitTodos()
  }, [])

  return (
    <ul
      className="todo-list"
      ref={parent}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        handleDrop(e)
      }}
    >
      {filteredTodos.map((todo) => (
        <li
          draggable
          onDragStart={() => {
            handleDragStart(todo.id)
          }}
          onDragEnd={(e) => {
            handleDragEnd(e)
          }}
          onDragOver={(e) => {
            handleDragOver(e, todo.id)
          }}
          key={todo.id}
          id={todo.id}
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
