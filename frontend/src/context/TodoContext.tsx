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
  type ListOfTodos,
} from '../types'
import { TODO_ACTIONS } from '../reducer/actions'
import { TodoService } from '../services/todos'

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

  const filteredTodos = state.todos.filter((item) => {
    if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
    if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
    return item
  })

  const handleInitTodos = async (): Promise<void> => {
    TodoService.getTodos()
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNewTodo = async (title: TodoTitle): Promise<void> => {
    TodoService.addTodo(title)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCheck = async (id: TodoId): Promise<void> => {
    TodoService.updateTodo(id)
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
    TodoService.updateTodo(id, title)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemove = async (id: TodoId): Promise<void> => {
    TodoService.removeTodo(id)
      .then((todos: ListOfTodos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log('error acá', err)
      })
  }

  const onClearCompleted = async (): Promise<void> => {
    TodoService.clearCompleted()
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
