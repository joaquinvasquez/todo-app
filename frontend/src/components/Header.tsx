import { useContext } from 'react'
import CreateTodo from './CreateTodo'
import Logo from '../assets/check-mark.svg'
import Sun from '../assets/light.png'
import Moon from '../assets/dark.png'
import ThemeContext from '../context/ThemeContext'

const Header: React.FC = () => {
  const { theme, handleTheme } = useContext(ThemeContext)
  return (
    <header className="header">
      <h1>
        TODO LIST <img src={Logo} alt="Logo" />
      </h1>
      <CreateTodo />
      <span
        className={`theme-switch-container ${theme}`}
        onClick={() => {
          handleTheme()
        }}
      >
        <div className="theme-switch-window">
          <span className="theme-switch" onClick={() => {}}>
            <img src={Sun} alt="light" />
          </span>
          <span className="theme-switch" onClick={() => {}}>
            <img src={Moon} alt="dark" />
          </span>
        </div>
      </span>
    </header>
  )
}

export default Header
