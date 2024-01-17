import { createRequire } from 'module'
import crypto from 'crypto'
const require = createRequire(import.meta.url)
const todosData = require('./db.json')

let todos = todosData.todos
const users = todosData.users

export class TodoModel {
  static getAllTodos = async ({ user }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      return []
    }
    return todos
      .sort((a, b) => a.order - b.order)
      .filter((todo) => todo.user === user)
      .map((todo, index) => ({ ...todo, order: index }))
  }

  static createTodo = async ({ user, title }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      order: todos.filter((todo) => todo.user === user).length,
      user,
    }
    todos.push(newTodo)
    const userTodos = todos
      .filter((todo) => todo.user === user)
      .map((todo, index) => ({ ...todo, order: index }))
    return userTodos
  }

  static updateTodo = async ({ user, id, body }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const userTodos = todos.filter((todo) => todo.user === user)
    let newTodo = null
    const index = userTodos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }
    if (body.title) {
      newTodo = { ...userTodos[index], title: body.title }
    } else {
      newTodo = { ...userTodos[index], completed: !userTodos[index].completed }
    }
    userTodos.splice(index, 1, newTodo)
    todos = todos.filter((todo) => todo.user !== user)
    todos.push(...userTodos)
    return userTodos.map((todo, index) => ({ ...todo, order: index }))
  }

  static deleteTodo = async ({ user, id }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const userTodos = todos.filter((todo) => todo.user === user)
    const index = userTodos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }

    userTodos.splice(index, 1)
    todos = todos.filter((todo) => todo.user !== user)
    todos.push(...userTodos)
    return userTodos.map((todo, index) => ({ ...todo, order: index }))
  }

  static deleteCompletedTodos = async ({ user }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const userTodos = todos
      .filter((todo) => todo.user === user && !todo.completed)
      .map((todo, index) => ({ ...todo, order: index }))
    todos = todos.filter((todo) => todo.user !== user)
    todos.push(...userTodos)
    return userTodos
  }

  static updateTodosOrder = async ({ user, todosOrder = [] }) => {
    if (users.findIndex((u) => u.user_id === user) === -1) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    let userTodos = todos
      .filter((todo) => todo.user === user)
      .map((todo, index) => ({ ...todo, order: index }))
    const todosOrderIds = todosOrder.map((todo) => todo.id).sort()
    const userTodosIds = userTodos.map((todo) => todo.id).sort()
    if (JSON.stringify(todosOrderIds) !== JSON.stringify(userTodosIds)) {
      const error = new Error('Todos conflict')
      error.statusCode = 422
      throw error
    }
    todos = todos.filter((todo) => todo.user !== user)
    userTodos = todosOrder.sort((a, b) => a.order - b.order)
    todos.push(...userTodos)
    return userTodos
  }
}
