import { Router } from 'express'
import { TodoController } from '../controlers/todo.js'

export const todoRouter = Router()

todoRouter.get('/:user_id/', TodoController.getAllTodos)
todoRouter.post('/:user_id/', TodoController.createTodo)
todoRouter.put('/:user_id/', TodoController.updateTodosOrder)
todoRouter.put('/:user_id/:id', TodoController.updateTodo)
todoRouter.delete('/:user_id/completed', TodoController.deleteCompletedTodos)
todoRouter.delete('/:user_id/:id', TodoController.deleteTodo)
