import {
  type StateType,
  type ActionType,
  type ListOfTodos,
  type TodoCompleted,
} from '../types'

import { TODO_ACTIONS } from './actions'

type ReducerType = (state: StateType, action: ActionType) => StateType

export const todoReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.UPDATE_LIST: {
      const todos: ListOfTodos = action.payload
      return {
        ...state,
        todos,
        activeCount: todos.filter((todo) => !todo.completed).length,
      }
    }

    case TODO_ACTIONS.ADD: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        activeCount: state.activeCount + 1,
      }
    }

    case TODO_ACTIONS.UPDATE: {
      const check: TodoCompleted = action.payload.completed
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload
          }
          return todo
        }),
        activeCount: check ? state.activeCount - 1 : state.activeCount + 1,
      }
    }

    case TODO_ACTIONS.ORDER_CHANGE: {
      const todos: ListOfTodos = action.payload
      return {
        ...state,
        todos,
      }
    }

    case TODO_ACTIONS.FILTER_CHANGE: {
      return {
        ...state,
        filter: action.payload,
      }
    }

    default:
      return state
  }
}
