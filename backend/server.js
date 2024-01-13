import express from 'express'
import { todoRouter } from './router/todos.js'
import { corsMiddleware, corsPreflightMiddleware } from './middlewares/cors.js'
import { errorHandler } from './middlewares/errorHandler.js'

const PORT = process.env.PORT ?? 3030

const app = express()

// PARA DESHABILITAR EL HEADER X-POWERED-BY
app.disable('x-powered-by')
// PARA PARSEAR EL BODY
app.use(express.json())
// PARA LOS CORS
app.use(corsMiddleware)
// PARA LOS CORS PREFLIGHT
app.options('*', corsPreflightMiddleware)

app.use('/todos', todoRouter)

// PARA EL ERROR HANDLING
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server listening on port http://localhost:${PORT} // ENV: ${process.env.NODE_ENV}`
  )
})
