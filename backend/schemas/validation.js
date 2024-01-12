import z from 'zod'

const todoSchema = z.object({
  title: z.string().min(1).max(50),
  completed: z.boolean(),
  order: z.number().int().min(0),
})

export const validateTodoCreate = (todo) => {
  return z.object({ title: z.string().min(1).max(50) }).safeParse(todo)
}

export const validateTodoUpdate = (todo) => {
  return todoSchema.partial().safeParse(todo)
}

export const validateId = (id) => {
  return z.string().uuid().safeParse(id)
}
