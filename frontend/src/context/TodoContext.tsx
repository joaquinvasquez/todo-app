import { useReducer, createContext, useEffect } from 'react'
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
import { TODO_ACTIONS } from '../reducer/actions'

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

  const filteredTodos = state.todos.filter((item) => {
    if (state.filter === TODO_FILTERS.ACTIVE) return !item.completed
    if (state.filter === TODO_FILTERS.COMPLETED) return item.completed
    return item
  })

  const handleInitTodos = async (): Promise<void> => {
    fetch(URL)
      .then(async (res) => await res.json())
      .then((todos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNewTodo = async (title: TodoTitle): Promise<void> => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then(async (res) => await res.json())
      .then((todo) => {
        dispatch({ type: TODO_ACTIONS.ADD, payload: todo })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCheck = async (id: TodoId): Promise<void> => {
    fetch(`${URL}/${id}`, {
      method: 'PUT',
    })
      .then(async (res) => await res.json())
      .then((todo) => {
        dispatch({ type: TODO_ACTIONS.UPDATE, payload: todo })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEditTitle = async (
    id: TodoId,
    title: TodoTitle
  ): Promise<void> => {
    fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(async (res) => await res.json())
      .then((todo) => {
        dispatch({ type: TODO_ACTIONS.UPDATE, payload: todo })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemove = (id: TodoId): void => {
    fetch(`${URL}/${id}`, {
      method: 'DELETE',
    })
      .then(async (res) => await res.json())
      .then((todos) => {
        dispatch({ type: TODO_ACTIONS.UPDATE_LIST, payload: todos })
      })
      .catch((err) => {
        console.log('error acá', err)
      })
  }

  const onClearCompleted = (): void => {
    fetch(`${URL}/completed`, {
      method: 'DELETE',
    })
      .then(async (res) => await res.json())
      .then((todos) => {
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
    filteredTodos,
    handleInitTodos,
    handleNewTodo,
    handleCheck,
    handleEditTitle,
    handleRemove,
    onClearCompleted,
    handleFilterChange,
  }

  useEffect(() => {
    console.log('UE', state.todos)
  }, [state.todos])

  return <TodoContext.Provider value={data}> {children} </TodoContext.Provider>
}

export { TodoProvider }
export default TodoContext
