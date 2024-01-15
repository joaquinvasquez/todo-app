import { createContext, useContext, useState } from 'react'
import { type ListOfTodos, type DADContextType, type TodoId } from '../types'
import TodoContext from './TodoContext'
import { TodoService } from '../services/todos'
import { TODO_ACTIONS } from '../reducer/actions'

const DragAndDropContext = createContext<DADContextType>(null!)

interface Props {
  children: React.ReactNode
}

const DADProvider: React.FC<Props> = ({ children }) => {
  const [isDragging, setIsDragging] = useState<TodoId>('')
  const [isDraggingIn, setIsDraggingIn] = useState<TodoId>('')
  const [isCorrectDrop, setIsCorrectDrop] = useState<boolean>(false)
  const [tempFilteredTodos, setTempFilteredTodos] = useState<ListOfTodos>([])

  const { state, filteredTodos, dispatch } = useContext(TodoContext)

  const handleOrderChange = (draggingId: TodoId, droppingId: TodoId): void => {
    const draggedIndex = state.todos.findIndex((todo) => todo.id === draggingId)
    const droppedIndex = state.todos.findIndex((todo) => todo.id === droppingId)

    const newTodos = [...state.todos]
    const draggedTodo = newTodos[draggedIndex]
    newTodos.splice(draggedIndex, 1)
    newTodos.splice(droppedIndex, 0, draggedTodo)
    dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: newTodos })
  }

  const handleDragStart = (draggingId: TodoId): void => {
    setIsDragging(draggingId)
    setTempFilteredTodos(filteredTodos)
    setIsCorrectDrop(false)
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    draggingId: TodoId
  ): void => {
    e.preventDefault()
    if (draggingId !== isDraggingIn && draggingId !== isDragging) {
      setIsDraggingIn(draggingId)
      handleOrderChange(isDragging, draggingId)
    }
    if (draggingId !== isDraggingIn && draggingId === isDragging) {
      setIsDraggingIn('')
    }
  }

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault()
    if (!isCorrectDrop) {
      dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: tempFilteredTodos })
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault()
    setIsCorrectDrop(true)
    TodoService.updateOrder(state.todos)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const data = {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  }

  return (
    <DragAndDropContext.Provider value={data}>
      {children}
    </DragAndDropContext.Provider>
  )
}

export { DADProvider }
export default DragAndDropContext
