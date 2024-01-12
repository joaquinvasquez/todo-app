import CreateTodo from './CreateTodo'
import Logo from '../assets/check-mark.svg'

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>
        TODO LIST <img src={Logo} alt="Logo" />
      </h1>
      <CreateTodo />
    </header>
  )
}

export default Header
