import { type TODO_FILTERS } from '../consts'

export type TodoId = string
export type TodoTitle = string
export type TodoCompleted = boolean
export type TodoOrder = number
// También se puede hacer así:
// type TodoId = Pick<Todo, 'id'>

export interface TodoType {
  id: TodoId
  title: TodoTitle
  completed: TodoCompleted
  order: TodoOrder
}

export type ListOfTodos = TodoType[]

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

export interface StateType {
  todos: ListOfTodos
  filter: FilterValue
  activeCount: number
}

export type TodoActionsType = (typeof TODO_ACTIONS)[keyof typeof TODO_ACTIONS]

export type PayloadType = ListOfTodos | FilterValue

export interface ActionType {
  type: TodoActionsType
  payload?: PayloadType
}

export interface TodoContextType {
  state: StateType
  dispatch: React.Dispatch<ActionType>
  loading: boolean
  filteredTodos: ListOfTodos
  handleInitTodos: () => void
  handleRemove: (id: TodoId) => void
  handleCheck: (id: TodoId) => void
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
  handleNewTodo: (text: TodoTitle) => void
  handleEditTitle: (id: TodoId, title: TodoTitle) => void
}

export interface DADContextType {
  handleDragStart: (id: TodoId) => void
  handleDragOver: (e: React.DragEvent<HTMLLIElement>, id: TodoId) => void
  handleDragEnd: (e: React.DragEvent<HTMLLIElement>) => void
  handleDrop: (e: React.DragEvent<HTMLElement>) => void
}

export interface ThemeContextType {
  theme: string
  handleTheme: () => void
}

export type UserType = string

export interface UserContextType {
  user: UserType
}
