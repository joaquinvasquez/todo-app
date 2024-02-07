import {
  type UserType,
  type ListOfTodos,
  type TodoId,
  type TodoTitle,
} from '../types'

const baseURL = 'https://todo-app-jvasquez-dev.onrender.com/todos'

export class TodoService {
  static getTodos = async (user: UserType): Promise<ListOfTodos> => {
    try {
      if (user === '') {
        return []
      }
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
    title: TodoTitle
  ): Promise<ListOfTodos> => {
    try {
      const res = await fetch(`${baseURL}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
        }),
      })
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error adding todo')
      throw e
    }
  }

  static updateTodo = async (
    user: UserType,
    id: TodoId,
    title: TodoTitle = ''
  ): Promise<ListOfTodos> => {
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
      const res = await fetch(`${baseURL}/${user}/${id}`, fetchOptions)
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error updating todo')
      throw e
    }
  }

  static removeTodo = async (
    user: UserType,
    id: TodoId
  ): Promise<ListOfTodos> => {
    try {
      const res = await fetch(`${baseURL}/${user}/${id}`, {
        method: 'DELETE',
      })
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error removing todo')
      throw e
    }
  }

  static clearCompleted = async (user: UserType): Promise<ListOfTodos> => {
    try {
      const res = await fetch(`${baseURL}/${user}/completed`, {
        method: 'DELETE',
      })
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error clearing completed todos')
      throw e
    }
  }

  static updateOrder = async (
    user: UserType,
    todos: ListOfTodos
  ): Promise<ListOfTodos> => {
    todos = todos.map((todo, index) => ({ ...todo, order: index }))
    try {
      const res = await fetch(`${baseURL}/${user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todos),
      })
      const newTodos: ListOfTodos = await res.json()
      return newTodos
    } catch (e) {
      console.log('Error updating order')
      throw e
    }
  }
}
