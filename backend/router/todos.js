import { Router } from 'express'
import { TodoController } from '../controlers/todo.js'

export const todoRouter = Router()

todoRouter.get('/', TodoController.getAllTodos)
todoRouter.post('/', TodoController.createTodo)
todoRouter.put('/:id', TodoController.updateTodo)
todoRouter.delete('/completed', TodoController.deleteCompletedTodos)
todoRouter.delete('/:id', TodoController.deleteTodo)
