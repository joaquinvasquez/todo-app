import { TodoModel } from '../models/mysql/todo.js'
import {
  validateId,
  validateTodoList,
  validateTodo,
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
      const validBody = validateTodo(req.body)
      if (!userId.success || !validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      const { title, id, order } = validBody.data
      await TodoModel.createTodo({ user: userId.data, title, id, order })
      res.status(201).send()
    } catch (err) {
      next(err)
    }
  }

  static updateTodo = async (req, res, next) => {
    try {
      const userId = validateUser(req.params.user_id)
      const validId = validateId(req.params.id)
      const validBody = validateTodo(req.body)
      if (!userId.success || !validId.success || !validBody.success) {
        res.status(400).json({ error: validBody.error })
      }
      await TodoModel.updateTodo({
        user: userId.data,
        id: validId.data,
        body: validBody.data,
      })
      res.send()
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
      await TodoModel.deleteTodo({
        user: userId.data,
        id: validId.data,
      })
      res.send()
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
      await TodoModel.deleteCompletedTodos({ user: userId.data })
      res.send()
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
      await TodoModel.updateTodosOrder({
        user: userId.data,
        todosOrder: validBody.data,
      })
      res.send()
    } catch (err) {
      next(err)
    }
  }
}
