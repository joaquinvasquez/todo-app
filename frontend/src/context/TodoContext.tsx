import { useReducer, createContext } from 'react'
import { TODO_FILTERS } from '../consts'
import { todoReducer } from '../reducer/todoReducer'
import {
  type ActionType,
  type TodoId,
  type StateType,
  type FilterValue,
  type TodoTitle,
  type TodoContextType,
} from '../types'

const TodoContext = createContext<TodoContextType>(null!)

export const InitialState: StateType = {
  todos: [],
  filter: TODO_FILTERS.ALL,
  activeCount: 0,
}

interface Props {
  children: React.ReactNode
}

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<(state: StateType, action: ActionType) => StateType>(todoReducer, InitialState)

  const filteredTodos = state.todos.filter((item) => {
    if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
    if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
    return item
  })

  const handleRemove = (id: TodoId): void => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  const handleCheck = (id: TodoId): void => {
    dispatch({ type: 'COMPLETE', payload: id })
  }

  const onClearCompleted = (): void => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: filter })
  }

  const handleNewTodo = (text: TodoTitle): void => {
    dispatch({ type: 'ADD', payload: text })
  }

  const handleEdit = (id: TodoId, title: TodoTitle): void => {
    dispatch({ type: 'UPDATE', payload: { id, title } })
  }

  const data = {
    state,
    dispatch,
    filteredTodos,
    handleRemove,
    handleCheck,
    onClearCompleted,
    handleFilterChange,
    handleNewTodo,
    handleEdit,
  }

  return <TodoContext.Provider value={data}> {children} </TodoContext.Provider>
}

export { TodoProvider }
export default TodoContext
