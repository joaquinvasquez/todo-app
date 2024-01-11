import { useContext, useState } from 'react'
import { type TodoTitle } from '../types'
import TodoContext from '../context/TodoContext'

const CreateTodo: React.FC = () => {
  const { handleNewTodo } = useContext(TodoContext)
  const [text, setText] = useState<TodoTitle>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleNewTodo(text)
    setText('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="New task..."
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        autoFocus
      />
    </form>
  )
}

export default CreateTodo
