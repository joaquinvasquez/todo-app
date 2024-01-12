import {
  type ListOfTodos,
  type TodoType,
  type TodoId,
  type TodoTitle,
} from '../types'

const URL = 'http://localhost:3030/todos'

export const getTodos = async (): Promise<ListOfTodos> => {
  const res = await fetch(URL)
  if (res.ok) {
    const todos = await res.json()
    return todos
  }
  console.log('Error fetching todos')
  return []
}

export const addTodo = async (title: TodoTitle): Promise<TodoType> => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  })
  if (!res.ok) {
    console.log('Error adding todo')
    throw new Error('Error adding todo')
  }
  const todo = await res.json()
  return todo
}

export const updateTodo = async (todo: TodoType): Promise<boolean> => {
  const res = await fetch(`${URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!res.ok) {
    console.log('Error updating todo')
  }
  return res.ok
}

export const removeTodo = async (id: TodoId): Promise<boolean> => {
  const res = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    console.log('Error removing todo')
  }
  return res.ok
}

// export const updateTodos = async (todos: ListOfTodos): Promise<boolean> => {
//   const res = await fetch(URL, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(todos),
//   })
//   if (!res.ok) {
//     console.log('Error updating todos')
//   }
//   return res.ok
// }
