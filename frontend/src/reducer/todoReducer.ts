import { type StateType, type ActionType, type ListOfTodos } from '../types'

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
      const newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: false,
        order: action.payload.order,
      }
      return {
        ...state,
        todos: [...state.todos, newTodo],
        activeCount: state.activeCount + 1,
      }
    }

    case TODO_ACTIONS.CHECK:
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

    case TODO_ACTIONS.EDIT_TITLE: {
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

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
        activeCount: state.todos.filter((todo) => !todo.completed).length,
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
