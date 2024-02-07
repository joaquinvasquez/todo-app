import express from 'express'
import 'dotenv/config'
import { todoRouter } from './router/todos.js'
import { corsMiddleware, corsPreflightMiddleware } from './middlewares/cors.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { UserController } from './controlers/user.js'

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
app.post('/users', UserController.createUser)

// PARA EL ERROR HANDLING
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} // ENV: ${process.env.NODE_ENV}`
  )
})

setInterval(async () => {
  await fetch('https://todo-app-jvasquez-dev.onrender.com/todos').then(
    console.log('To maintain the server awake')
  )
}, 60000) // 1 minute
// }, 3600000) // 1 hour
