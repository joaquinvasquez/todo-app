import { createRequire } from 'module'
import crypto from 'crypto'
const require = createRequire(import.meta.url)
const todosData = require('../db.json')

let todos = todosData.todos

export class TodoModel {
  static getAllTodos = async () => {
    return todos
      .sort((a, b) => a.order - b.order)
      .map((todo, index) => ({ ...todo, order: index }))
  }

  static getIndexById = async ({ id }) => {
    return todos.findIndex((todo) => todo.id === id)
  }

  static createTodo = async ({ title }) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      order: todos.length,
    }
    todos.push(newTodo)
    return newTodo
  }

  static updateTodo = async ({ id, body }) => {
    let newTodo = null
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }
    if (body.title) {
      newTodo = { ...todos[index], title: body.title }
    } else {
      newTodo = { ...todos[index], completed: !todos[index].completed }
    }
    todos.splice(index, 1, newTodo)
    return newTodo
  }

  static deleteTodo = async ({ id }) => {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }

    todos.splice(index, 1)
    todos = todos.map((todo, index) => ({ ...todo, order: index }))
    return todos
  }

  static deleteCompletedTodos = async () => {
    todos = todos.filter((todo) => !todo.completed)
    todos = todos.map((todo, index) => ({ ...todo, order: index }))
    return todos
  }
}
