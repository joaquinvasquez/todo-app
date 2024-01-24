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
// - firebase deploy del backend?
// - actualizar URL del backend en el frontend y viceversa
// - mobile?
