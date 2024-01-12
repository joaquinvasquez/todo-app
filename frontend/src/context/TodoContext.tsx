import { useReducer, createContext } from 'react'
import { TODO_FILTERS } from '../consts'
import { todoReducer } from '../reducer/todoReducer'
import {
  type ActionType,
  type TodoContextType,
  type FilterValue,
  type StateType,
  type TodoId,
  type TodoTitle,
} from '../types'

const TodoContext = createContext<TodoContextType>(null!)

const URL = 'http://localhost:3030/todos'

export const InitialState: StateType = {
  todos: [],
  filter: TODO_FILTERS.ALL,
  activeCount: 0,
}

interface Props {
  children: React.ReactNode
}

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
  (state: StateType, action: ActionType) => StateType
  >(todoReducer, InitialState)

  const filteredTodos = state.todos
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .filter((item) => {
      if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
      if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
      return item
    })

  const handleInitTodos = async (): Promise<void> => {
    fetch(URL)
      .then(async (res) => await res.json())
      .then((todos) => {
        dispatch({ type: 'INIT_TODOS', payload: todos })
      })
      .catch((err) => {
        console.log('ERROR PAAAAAA', err)
      })
  }

  const handleNewTodo = async (title: TodoTitle): Promise<void> => {
    dispatch({ type: 'ADD', payload: title })
  }

  const handleCheck = async (id: TodoId): Promise<void> => {
    dispatch({ type: 'COMPLETE', payload: id })
  }

  const handleEdit = async (id: TodoId, title: TodoTitle): Promise<void> => {
    dispatch({ type: 'UPDATE', payload: { id, title } })
  }

  const handleRemove = (id: TodoId): void => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const onClearCompleted = (): void => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: filter })
  }

  const data = {
    state,
    filteredTodos,
    handleInitTodos,
    handleNewTodo,
    handleCheck,
    handleEdit,
    handleRemove,
    onClearCompleted,
    handleFilterChange,
  }

  return <TodoContext.Provider value={data}> {children} </TodoContext.Provider>
}

export { TodoProvider }
export default TodoContext
