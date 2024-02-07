const ACCEPTED_ORIGINS = [
  'https://todos-app-jv.web.app',
  'https://todos-app-jv.firebaseapp.com',
  'http://localhost:5173',
]

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
}

export const corsPreflightMiddleware = (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.send()
}
