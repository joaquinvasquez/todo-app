import { type StateType, type ActionType } from '../types'

import { TODO_ACTIONS } from './actions'

type ReducerType = (state: StateType, action: ActionType) => StateType

const todos = [
  {
    id: 'f7a846d3-4b8a-4a1d-946b-df76ec6bd90f',
    title: 'todo 1',
    completed: false,
    // order: 1,
  },
  {
    id: '7bd56810-31b1-486f-8c3d-4a4120bd8a62',
    title: 'todo 2',
    completed: true,
    // order: 2,
  },
  {
    id: 'e6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 3',
    completed: false,
    // order: 6,
  },
  {
    id: 'b6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 4',
    completed: false,
    // order: 3,
  },
  {
    id: 'c6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 5',
    completed: false,
    // order: 5,
  },
  {
    id: 'd6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 6',
    completed: true,
    // order: 4,
  },
]

export const todoReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.INIT_TODOS:
      return {
        ...state,
        todos,
        activeCount: todos.filter((todo) => !todo.completed).length,
      }

    case TODO_ACTIONS.ADD: {
      const newTodo = {
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      }

      return {
        ...state,
        todos: [...state.todos, newTodo],
        activeCount: state.activeCount + 1,
      }
    }

    case TODO_ACTIONS.COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed
          }
          return todo
        }),
        activeCount: state.todos.filter((todo) => !todo.completed).length,
      }

    case TODO_ACTIONS.REMOVE: {
      const todoToRemove = state.todos.find(
        (todo) => todo.id === action.payload
      )
      if (todoToRemove !== undefined) {
        return todoToRemove.completed
          ? {
              ...state,
              todos: state.todos.filter((todo) => todo.id !== action.payload),
              activeCount: state.todos.filter((todo) => !todo.completed).length,
            }
          : {
              ...state,
              todos: state.todos.filter((todo) => todo.id !== action.payload),
              activeCount:
                state.todos.filter((todo) => !todo.completed).length - 1,
            }
      }
      return state
    }

    case TODO_ACTIONS.UPDATE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title
          }
          return todo
        }),
      }
    }

    case TODO_ACTIONS.FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
      }

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }

    default:
      return state
  }
}
