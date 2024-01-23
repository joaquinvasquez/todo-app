import z from 'zod'

const todoSchema = z.object({
  title: z.string().min(1).max(50),
  completed: z.coerce.boolean(),
  order: z.number().int().min(0),
  user: z.string().uuid(),
})

const todoUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(50),
  completed: z.coerce.boolean(),
  order: z.number().int().min(0),
  user: z.string().uuid(),
})

const todoListSchema = z.array(todoUpdateSchema)

const userSchema = z.string().uuid()

export const validateTodoCreate = (todo) => {
  return z.object({ title: z.string().min(1).max(50) }).safeParse(todo)
}

export const validateTodoUpdate = (todo) => {
  return todoSchema.partial().safeParse(todo)
}

export const validateId = (id) => {
  return z.string().uuid().safeParse(id)
}

export const validateTodoList = (todoList) => {
  return todoListSchema.safeParse(todoList)
}

export const validateUser = (user) => {
  return userSchema.safeParse(user)
}
