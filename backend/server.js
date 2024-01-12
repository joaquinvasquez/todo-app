import express from 'express'
import crypto from 'crypto'
import {
  validateId,
  validateTodoCreate,
  validateTodoUpdate,
} from './schemas/validation.js'

let todos = [
  {
    id: 'f7a846d3-4b8a-4a1d-946b-df76ec6bd90f',
    title: 'todo 1',
    completed: false,
    order: 1,
  },
  {
    id: '7bd56810-31b1-486f-8c3d-4a4120bd8a62',
    title: 'todo 2',
    completed: true,
    order: 2,
  },
  {
    id: 'e6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 3',
    completed: false,
    order: 0,
  },
  {
    id: 'b6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 4',
    completed: false,
    order: 3,
  },
  {
    id: 'c6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 5',
    completed: false,
    order: 5,
  },
  {
    id: 'd6f1c9f1-4f3a-4d3e-8f9e-6a2d4a0a8e5d',
    title: 'todo 6',
    completed: true,
    order: 4,
  },
]

const ACCEPTED_ORIGINS = ['http://localhost:5173']

const PORT = process.env.PORT ?? 3030

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.get('/todos', (req, res) => {
  todos = todos
    .sort((a, b) => a.order - b.order)
    .map((todo, index) => ({ ...todo, order: index }))
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const validBody = validateTodoCreate(req.body)
  if (!validBody.success) {
    res.status(400).json({ error: validBody.error })
  }
  const { title } = validBody.data

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    order: todos.length,
  }

  todos.push(newTodo)

  res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  const validId = validateId(req.params.id)
  if (!validId.success) {
    res.status(400).json({ error: validId.error })
  }

  const todoIndex = todos.findIndex((todo) => todo.id === validId.data)
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' })
  }

  let newTodo = null
  if (req.body.title) {
    const validBody = validateTodoUpdate(req.body)
    if (!validBody.success) {
      res.status(400).json({ error: validBody.error })
    }
    newTodo = { ...todos[todoIndex], ...validBody.data }
  } else {
    newTodo = { ...todos[todoIndex], completed: !todos[todoIndex].completed }
  }

  todos.splice(todoIndex, 1, newTodo)
  res.send(newTodo)
})

app.delete('/todos/completed', (req, res) => {
  todos = todos
    .filter((todo) => !todo.completed)
    .map((todo, index) => ({ ...todo, order: index }))
  res.send(todos)
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
  todos = todos.map((todo, index) => ({ ...todo, order: index }))
  res.json(todos)
})

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.send()
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
