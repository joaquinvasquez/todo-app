import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'todomvc-app-css/index.css'
import './index.css'
import { TodoProvider } from './context/TodoContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <UserProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </UserProvider>
  </ThemeProvider>
)

// TODO:
// - Crear API ✔️
// - Mejorar API ✔️
// - Mejorar consumo de API en el front ✔️
// - Drag and drop ✔️
// - Modo oscuro y claro ✔️
// - Encontrar la manera de guardar en la base a cada usuario por dispositivo => localStorage ✔️
// - Arquitectura de la base de datos ✔️
// - Codear la logica del manejo de usuarios ✔️
// - Crear la base de datos ✔️
// - Codear la logica de la base de datos ✔️
// - Desplegar API
// - Desplegar DB
// - Desplegar Front
// - Revisar en mobile
