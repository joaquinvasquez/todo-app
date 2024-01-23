import { useContext, useState } from 'react'
import TodoContext from '../context/TodoContext'
import { type TodoTitle } from '../types'

const CreateTodo: React.FC = () => {
  const { handleNewTodo } = useContext(TodoContext)
  const [text, setText] = useState<TodoTitle>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (text.trim() !== '') {
      handleNewTodo(text)
      setText('')
    }
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
