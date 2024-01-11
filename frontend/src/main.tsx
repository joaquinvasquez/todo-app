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
// - Drag and drop ❌
// - Crear API ✔️(falta mejorarla pero ya responde) y desplegarla
// - Encontrar la manera de guardar en la base a cada usuario por dispositivo
// - Arquitectura de la base de datos
// - Crear y desplegar la base de datos
// - Modo oscuro y claro
