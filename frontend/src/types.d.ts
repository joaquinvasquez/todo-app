import { type TODO_FILTERS } from '../consts'

export type TodoId = string
export type TodoTitle = string
export type TodoCompleted = boolean
// También se puede hacer así:
// type TodoId = Pick<Todo, 'id'>

export interface Todo {
  id: TodoId
  title: TodoTitle
  completed: TodoCompleted
}

export type ListOfTodos = Todo[]

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

export interface StateType {
  todos: ListOfTodos
  filter: FilterValue
  activeCount: number
}

export type TodoActionsType = (typeof TODO_ACTIONS)[keyof typeof TODO_ACTIONS]

export type PayloadType =
  | TodoId
  | TodoTitle
  | { id: TodoId, title: TodoTitle }
  | FilterValue
  | ListOfTodos

export interface ActionType {
  type: TodoActionsType
  payload?: PayloadType
}

export interface TodoContextType {
  state: StateType
  dispatch: (action: ActionType) => void
  filteredTodos: ListOfTodos
  handleRemove: (id: TodoId) => void
  handleCheck: (id: TodoId) => void
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
  handleNewTodo: (text: TodoTitle) => void
  handleEdit: (id: TodoId, title: TodoTitle) => void
}
