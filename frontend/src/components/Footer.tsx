import { useContext } from 'react'
import { TODO_FILTERS } from '../consts'
import Filters from './Filters'
import TodoContext from '../context/TodoContext'

const Footer: React.FC = () => {
  const { state, onClearCompleted, handleFilterChange } = useContext(TodoContext)
  const { todos, activeCount, filter } = state
  const completedCount = todos.length - activeCount

  return (
    <div className="footer">
      <span className="todo-count">
        Items left:{' '}
        <strong>
          {activeCount} / {todos.length}
        </strong>
      </span>
      <Filters />
      {completedCount > 0 && filter !== TODO_FILTERS.ACTIVE && (
        <button
          className="clear-completed"
          onClick={() => {
            onClearCompleted()
            handleFilterChange(TODO_FILTERS.ALL)
          }}
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  )
}

export default Footer
