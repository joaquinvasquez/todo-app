import express from 'express'
import crypto from 'crypto'
import {
  validateId,
  validateTodoCreate,
  validateTodoUpdate,
} from './schemas/validation.js'

const todos = [
  { id: 'f7a846d3-4b8a-4a1d-946b-df76ec6bd90f', title: 'todo 1', completed: false },
  { id: '7bd56810-31b1-486f-8c3d-4a4120bd8a62', title: 'todo 2', completed: true },
  { id: 'e6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d', title: 'todo 3', completed: false },
  { id: 'b6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d', title: 'todo 4', completed: false },
  { id: 'c6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d', title: 'todo 5', completed: false },
  { id: 'd6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d', title: 'todo 6', completed: true },
]
const app = express()

app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 3030

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const validBody = validateTodoCreate(req.body)
  if (!validBody.success) {
    res.status(400).json({ error: validBody.error })
  }
  const { title, completed } = validBody.data

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed,
  }

  todos.push(newTodo)

  res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  const validId = validateId(req.params.id)
  if (!validId.success) {
    res.status(400).json({ error: validId.error })
  }
  const validBody = validateTodoUpdate(req.body)
  if (!validBody.success) {
    res.status(400).json({ error: validBody.error })
  }
  const todoIndex = todos.findIndex((todo) => todo.id === validId.data)

  const newTodo = { ...todos[todoIndex], ...validBody.data }

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' })
  }
  todos.splice(todoIndex, 1)
  todos.push(newTodo)
  res.send(newTodo)
})

app.delete('/todos/:id', (req, res) => {
  const validId = validateId(req.params.id)
  if (!validId.success) {
    res.status(400).json({ error: validId.error })
  }
  const todoIndex = todos.findIndex((todo) => todo.id === validId.data)

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' })
  }

  todos.splice(todoIndex, 1)
  res.json({ message: 'Todo deleted' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
