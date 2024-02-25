/* eslint-disable multiline-ternary */
import Todos from './components/Todos'
import Footer from './components/Footer'
import Header from './components/Header'
import { DADProvider } from './context/DragAndDropContext.tsx'
import { useContext } from 'react'
import TodoContext from './context/TodoContext.tsx'
import Spinner from './components/Spinner.tsx'

const App = (): JSX.Element => {
  const { loading } = useContext(TodoContext)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="todoapp">
          <Header />
          <DADProvider>
            <Todos />
          </DADProvider>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
