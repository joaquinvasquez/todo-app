import { useContext } from 'react'
import { FILTERS_BUTTONS } from '../consts'
import TodoContext from '../context/TodoContext'
import { type FilterValue } from '../types'

const Filters: React.FC = () => {
  const { state, handleFilterChange } = useContext(TodoContext)
  const { filter } = state
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => {
        const isSelected = key === filter
        const className = isSelected ? 'selected' : ''
        return (
          <li key={key}>
            <a
              href={href}
              className={className}
              onClick={(e) => {
                e.preventDefault()
                handleFilterChange(key as FilterValue)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Filters
