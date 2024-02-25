import {
  type UserType,
  type ListOfTodos,
  type TodoId,
  type TodoTitle,
} from '../types'

const baseURL = 'https://todo-app-jvasquez-dev.onrender.com/todos'

export class TodoService {
  static getTodos = async (user: UserType): Promise<ListOfTodos> => {
    if (user === '') {
      return []
    }
    try {
      const res = await fetch(`${baseURL}/${user}`)
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error fetching todos')
      throw e
    }
  }

  static addTodo = async (
    user: UserType,
    title: TodoTitle,
    id: TodoId,
    order: number
  ): Promise<void> => {
    try {
      await fetch(`${baseURL}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title,
          order,
        }),
      })
    } catch (e) {
      console.log('Error adding todo')
      throw e
    }
  }

  static updateTodo = async (
    user: UserType,
    id: TodoId,
    title: TodoTitle = ''
  ): Promise<void> => {
    try {
      let fetchOptions: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      }
      if (title !== '') {
        fetchOptions = {
          ...fetchOptions,
          body: JSON.stringify({ title }),
        }
      }
      await fetch(`${baseURL}/${user}/${id}`, fetchOptions)
    } catch (e) {
      console.log('Error updating todo')
      throw e
    }
  }

  static removeTodo = async (user: UserType, id: TodoId): Promise<void> => {
    try {
      await fetch(`${baseURL}/${user}/${id}`, {
        method: 'DELETE',
      })
    } catch (e) {
      console.log('Error removing todo')
      throw e
    }
  }

  static clearCompleted = async (user: UserType): Promise<void> => {
    try {
      await fetch(`${baseURL}/${user}/completed`, {
        method: 'DELETE',
      })
    } catch (e) {
      console.log('Error clearing completed todos')
      throw e
    }
  }

  static updateOrder = async (
    user: UserType,
    todos: ListOfTodos
  ): Promise<void> => {
    todos = todos.map((todo, index) => ({ ...todo, order: index }))
    try {
      await fetch(`${baseURL}/${user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todos),
      })
    } catch (e) {
      console.log('Error updating order')
      throw e
    }
  }
}
