import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'todomvc-app-css/index.css'
import './index.css'
import { TodoProvider } from './context/TodoContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TodoProvider>
    <App />
  </TodoProvider>
)

// TODO:
// - Crear API ✔️
// - Mejorar API
// - Mejorar consumo de API en el front
// - Drag and drop
// - Modo oscuro y claro
// - Encontrar la manera de guardar en la base a cada usuario por dispositivo
// - Arquitectura de la base de datos
// - Crear la base de datos
// - Desplegar API
// - Desplegar DB
// - Desplegar Front
