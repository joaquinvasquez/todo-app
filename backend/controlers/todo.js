import { TodoModel } from '../models/local/todo.js'
import {
  validateId,
  validateTodoCreate,
  validateTodoList,
  validateTodoUpdate,
} from '../schemas/validation.js'

export class TodoController {
  static getAllTodos = async (req, res, next) => {
    try {
      const todos = await TodoModel.getAllTodos()
      res.json(todos)
    } catch (err) {
      next(err)
    }
  }

  static createTodo = async (req, res, next) => {
    try {
      const validBody = validateTodoCreate(req.body)
      if (!validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const { title } = validBody.data
      const newTodos = await TodoModel.createTodo({ title })
      res.status(201).json(newTodos)
    } catch (err) {
      next(err)
    }
  }

  static updateTodo = async (req, res, next) => {
    try {
      const validId = validateId(req.params.id)
      if (!validId.success) {
        res.status(400).json({ error: validId.error })
      }
      const validBody = validateTodoUpdate(req.body)
      if (!validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const updated = await TodoModel.updateTodo({
        id: validId.data,
        body: validBody.data,
      })
      res.json(updated)
    } catch (err) {
      next(err)
    }
  }

  static deleteCompletedTodos = async (req, res, next) => {
    try {
      const todos = await TodoModel.deleteCompletedTodos()
      res.send(todos)
    } catch (err) {
      next(err)
    }
  }

  static deleteTodo = async (req, res, next) => {
    try {
      const validId = validateId(req.params.id)
      if (!validId.success) {
        res.status(400).json({ error: validId.error })
      }
      const deleted = await TodoModel.deleteTodo({ id: validId.data })
      res.json(deleted)
    } catch (err) {
      next(err)
    }
  }

  static updateTodosOrder = async (req, res, next) => {
    try {
      const validBody = validateTodoList(req.body)
      const updated = await TodoModel.updateTodosOrder(validBody.data)
      res.json(updated)
    } catch (err) {
      next(err)
    }
  }
}
