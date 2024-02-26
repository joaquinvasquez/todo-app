/* eslint-disable @typescript-eslint/indent */
import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TODO_FILTERS } from '../consts'
import { todoReducer } from '../reducer/todoReducer'
import {
  type ActionType,
  type TodoContextType,
  type FilterValue,
  type StateType,
  type TodoId,
  type TodoTitle,
  type ListOfTodos,
} from '../types'
import { TODO_ACTIONS } from '../reducer/actions'
import { TodoService } from '../services/todos'
import UserContext from './UserContext'

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
  const [state, dispatch] = useReducer<
    (state: StateType, action: ActionType) => StateType
  >(todoReducer, InitialState)
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  const filteredTodos = state.todos.filter((item) => {
    if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
    if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
    return item
  })

  const handleInitTodos = async (): Promise<void> => {
    try {
      const todos: ListOfTodos = await TodoService.getTodos(user)
      dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      if (todos.length !== 0 || user !== '') setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleNewTodo = async (title: TodoTitle): Promise<void> => {
    const id = crypto.randomUUID()
    const order = state.todos.length
    dispatch({ type: TODO_ACTIONS.ADD, payload: { title, id, order, user } })
    try {
      await TodoService.addTodo(user, title, id, order)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheck = async (id: TodoId): Promise<void> => {
    dispatch({ type: TODO_ACTIONS.CHECK, payload: id })
    TodoService.updateTodo(user, id).catch((err) => {
      console.error(err)
    })
  }

  const handleEditTitle = async (
    id: TodoId,
    title: TodoTitle
  ): Promise<void> => {
    dispatch({ type: TODO_ACTIONS.EDIT_TITLE, payload: { id, title } })
    try {
      await TodoService.updateTodo(user, id, title)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemove = async (id: TodoId): Promise<void> => {
    dispatch({ type: TODO_ACTIONS.REMOVE, payload: id })
    try {
      await TodoService.removeTodo(user, id)
    } catch (err) {
      console.error(err)
    }
  }

  const onClearCompleted = async (): Promise<void> => {
    dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED })
    try {
      await TodoService.clearCompleted(user)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: TODO_ACTIONS.FILTER_CHANGE, payload: filter })
  }

  useEffect(() => {
    handleInitTodos().catch((err) => {
      console.error(err)
    })
  }, [user])

  const data = {
    state,
    dispatch,
    loading,
    filteredTodos,
    handleInitTodos,
    handleNewTodo,
    handleCheck,
    handleEditTitle,
    handleRemove,
    onClearCompleted,
    handleFilterChange,
  }

  return <TodoContext.Provider value={data}> {children} </TodoContext.Provider>
}

export { TodoProvider }
export default TodoContext
