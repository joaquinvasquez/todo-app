import { createContext, useEffect, useState } from 'react'
import { type ThemeContextType, type TodoId } from '../types'

const ThemeContext = createContext<ThemeContextType>(null!)

interface Props {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<TodoId>('dark')

  const handleTheme = (): void => {
    if (theme === 'dark') {
      setTheme('')
      document.querySelector('html')!.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      document.querySelector('html')!.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }
  useEffect(() => {
    const localTheme = localStorage.getItem('theme') ?? 'dark'
    if (localTheme === 'dark') {
      setTheme('dark')
      document.querySelector('html')!.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('')
    }
  }, [])
  const data = { theme, handleTheme }

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
