import { Router } from 'express'
import {
  validateId,
  validateTodoCreate,
  validateTodoUpdate,
} from '../schemas/validation.js'
import { TodoModel } from '../models/todo.js'

export const todoRouter = Router()

todoRouter.get('/', async (req, res, next) => {
  try {
    const todos = await TodoModel.getAllTodos()
    res.json(todos)
  } catch (err) {
    next(err)
  }
})

todoRouter.post('/', async (req, res, next) => {
  try {
    const validBody = validateTodoCreate(req.body)
    if (!validBody.success) {
      res.status(400).json({ error: validBody.error })
    }
    const { title } = validBody.data
    const newTodo = await TodoModel.createTodo({ title })
    res.status(201).json(newTodo)
  } catch (err) {
    next(err)
  }
})

todoRouter.put('/:id', async (req, res, next) => {
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
})

todoRouter.delete('/completed', async (req, res, next) => {
  try {
    const todos = await TodoModel.deleteCompletedTodos()
    res.send(todos)
  } catch (err) {
    next(err)
  }
})

todoRouter.delete('/:id', async (req, res, next) => {
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
})
