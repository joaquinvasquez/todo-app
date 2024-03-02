import { createContext, useContext, useState } from 'react'
import { type ListOfTodos, type DADContextType, type TodoId } from '../types'
import TodoContext from './TodoContext'
import { TodoService } from '../services/todos'
import { TODO_ACTIONS } from '../reducer/actions'
import UserContext from './UserContext'

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
  const { user } = useContext(UserContext)

  const handleOrderChange = (
    draggingId: TodoId,
    draggingInId: TodoId
  ): void => {
    const draggedIndex = state.todos.findIndex((todo) => todo.id === draggingId)
    const draggedInIndex = state.todos.findIndex(
      (todo) => todo.id === draggingInId
    )

    const newTodos = [...state.todos]
    const draggedTodo = newTodos[draggedIndex]
    newTodos.splice(draggedIndex, 1)
    newTodos.splice(draggedInIndex, 0, draggedTodo)
    dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: newTodos })
  }

  const handleDragStart = (draggingId: TodoId): void => {
    setIsDragging(draggingId)
    setTempFilteredTodos(filteredTodos)
    setIsCorrectDrop(false)
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    draggingInId: TodoId
  ): void => {
    e.preventDefault()
    if (draggingInId !== isDraggingIn && draggingInId !== isDragging) {
      // cuando un elemento se arrastra sobre otro (este otro ejecuta la función)
      setIsDraggingIn(draggingInId)
      handleOrderChange(isDragging, draggingInId)
    }
    if (draggingInId !== isDraggingIn && draggingInId === isDragging) {
      // cuando se arrastra un elemento sobre sí mismo
      setIsDraggingIn('')
    }
  }

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault()
    if (!isCorrectDrop) {
      dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: tempFilteredTodos })
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLElement>): Promise<void> => {
    e.preventDefault()
    setIsCorrectDrop(true)
    try {
      await TodoService.updateOrder(user, state.todos)
    } catch (err) {
      console.error(err)
    }
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
