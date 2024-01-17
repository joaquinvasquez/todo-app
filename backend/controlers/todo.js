import { TodoModel } from '../models/local/todo.js'
import {
  validateId,
  validateTodoCreate,
  validateTodoList,
  validateTodoUpdate,
  validateUser,
} from '../schemas/validation.js'

export class TodoController {
  static getAllTodos = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      if (!userId.success) {
        res.status(400).json({ error: userId.error })
      }
      const todos = await TodoModel.getAllTodos({ user: userId.data })
      res.json(todos)
    } catch (err) {
      next(err)
    }
  }

  static createTodo = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      const validBody = validateTodoCreate(req.body)
      if (!userId.success || !validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const { title } = validBody.data
      const newTodos = await TodoModel.createTodo({ user: userId.data, title })
      res.status(201).json(newTodos)
    } catch (err) {
      next(err)
    }
  }

  static updateTodo = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      const validId = validateId(req.params.id)
      const validBody = validateTodoUpdate(req.body)
      if (!userId.success || !validId.success || !validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const updated = await TodoModel.updateTodo({
        user: userId.data,
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
      const userId = validateUser(req.params.user_id)
      if (!userId.success) {
        res.status(400).json({ error: userId.error })
      }
      const todos = await TodoModel.deleteCompletedTodos({ user: userId.data })
      res.send(todos)
    } catch (err) {
      next(err)
    }
  }

  static deleteTodo = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      const validId = validateId(req.params.id)
      if (!userId.success || !validId.success) {
        res.status(400).json({ error: validId.error })
      }
      const deleted = await TodoModel.deleteTodo({
        user: userId.data,
        id: validId.data,
      })
      res.json(deleted)
    } catch (err) {
      next(err)
    }
  }

  static updateTodosOrder = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      const validBody = validateTodoList(req.body)
      if (!userId.success || !validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const updated = await TodoModel.updateTodosOrder({
        user: userId.data,
        todosOrder: validBody.data,
      })
      res.json(updated)
    } catch (err) {
      next(err)
    }
  }
}
