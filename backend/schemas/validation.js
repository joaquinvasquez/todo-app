import z from 'zod'

const todoSchema = z.object({
  title: z.string().min(1).max(50),
  completed: z.boolean(),
})

export const validateTodoCreate = (todo) => {
  return todoSchema.safeParse(todo)
}

export const validateTodoUpdate = (todo) => {
  return todoSchema.partial().safeParse(todo)
}

export const validateId = (id) => {
  return z.string().uuid().safeParse(id)
}
