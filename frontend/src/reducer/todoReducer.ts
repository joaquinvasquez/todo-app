import {
  type StateType,
  type ActionType,
  type ListOfTodos,
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
