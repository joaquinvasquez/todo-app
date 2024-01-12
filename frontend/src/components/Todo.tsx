import { useContext, useEffect, useRef, useState } from 'react'

import TodoContext from '../context/TodoContext'
import { type TodoType, type TodoId, type TodoTitle } from '../types'

interface Props {
  data: TodoType
  isEditing: TodoId
  setIsEditing: (id: TodoId) => void
}

const Todo: React.FC<Props> = ({ data, isEditing, setIsEditing }) => {
  const { id, title, completed } = data
  const { handleRemove, handleCheck, handleEdit } = useContext(TodoContext)
  const [editedTitle, setEditedTitle] = useState<TodoTitle>(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        handleEdit(id, editedTitle)
      }
      if (editedTitle === '') {
        handleRemove(id)
      }
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          checked={completed}
          type="checkbox"
          onChange={() => {
            handleCheck(id)
          }}
        />
        <label>{title}</label>
        <button
          className="destroy"
          onClick={() => {
            handleRemove(id)
          }}
        />
      </div>
      <input
        className="edit"
        value={editedTitle}
        onChange={(e) => {
          setEditedTitle(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing('')
        }}
        ref={inputEditTitle}
      />
    </>
  )
}

export default Todo
