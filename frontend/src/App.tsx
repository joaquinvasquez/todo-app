import Todos from './components/Todos'
import Footer from './components/Footer'
import Header from './components/Header'
import { DADProvider } from './context/DragAndDropContext.tsx'

const App = (): JSX.Element => {
  return (
    <div className="todoapp">
      <Header />
      <DADProvider>
        <Todos />
      </DADProvider>
      <Footer />
    </div>
  )
}

export default App
