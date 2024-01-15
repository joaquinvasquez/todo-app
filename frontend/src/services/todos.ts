import { type ListOfTodos, type TodoId, type TodoTitle } from '../types'

const URL = 'http://localhost:3030/todos'

export class TodoService {
  static getTodos = async (): Promise<ListOfTodos> => {
    try {
      const res = await fetch(URL)
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error fetching todos')
      throw e
    }
  }

  static addTodo = async (title: TodoTitle): Promise<ListOfTodos> => {
    try {
      const res = await fetch(URL, {
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
      const res = await fetch(`${URL}/${id}`, fetchOptions)
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error updating todo')
      throw e
    }
  }

  static removeTodo = async (id: TodoId): Promise<ListOfTodos> => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      })
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error removing todo')
      throw e
    }
  }

  static clearCompleted = async (): Promise<ListOfTodos> => {
    try {
      const res = await fetch(`${URL}/completed`, {
        method: 'DELETE',
      })
      const todos: ListOfTodos = await res.json()
      return todos
    } catch (e) {
      console.log('Error clearing completed todos')
      throw e
    }
  }

  static updateOrder = async (todos: ListOfTodos): Promise<ListOfTodos> => {
    todos = todos.map((todo, index) => ({ ...todo, order: index }))
    try {
      const res = await fetch(URL, {
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
