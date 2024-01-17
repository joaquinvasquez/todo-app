import { useReducer, createContext, useContext, useEffect } from 'react'
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
  const { user } = useContext(UserContext)

  const filteredTodos = state.todos.filter((item) => {
    if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
    if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
    return item
  })

  const handleInitTodos = async (): Promise<void> => {
    TodoService.getTodos(user)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNewTodo = async (title: TodoTitle): Promise<void> => {
    console.log('user: ', user)
    TodoService.addTodo(user, title)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCheck = async (id: TodoId): Promise<void> => {
    TodoService.updateTodo(user, id)
      .then((todos: ListOfTodos) => {
        dispatch({
          type: TODO_ACTIONS.UPDATE_LIST,
          payload: todos,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEditTitle = async (
    id: TodoId,
    title: TodoTitle
  ): Promise<void> => {
    TodoService.updateTodo(user, id, title)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemove = async (id: TodoId): Promise<void> => {
    TodoService.removeTodo(user, id)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onClearCompleted = async (): Promise<void> => {
    TodoService.clearCompleted(user)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: TODO_ACTIONS.FILTER_CHANGE, payload: filter })
  }

  useEffect(() => {
    handleInitTodos().catch((err) => {
      console.log(err)
    })
  }, [user])

  const data = {
    state,
    dispatch,
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
