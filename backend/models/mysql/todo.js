import { dbConnection } from './db-config.js'

export class TodoModel {
  static getAllTodos = async ({ user }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      return []
    }
    const [todos] = await dbConnection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static createTodo = async ({ user, title, id, order }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await dbConnection.query(
      'INSERT INTO todos (title, id, `order`, `user`) VALUES (?, ?, ?, UUID_TO_BIN(?));',
      [title, id, order, user]
    )
  }

  static updateTodo = async ({ user, id, body }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    if (body.title) {
      await dbConnection.query(
        'UPDATE todos SET title = ? WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [body.title, id, user]
      )
    } else {
      await dbConnection.query(
        'UPDATE todos SET completed = !completed WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [id, user]
      )
    }
  }

  static deleteTodo = async ({ user, id }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await dbConnection.query(
      'DELETE FROM todos WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
      [id, user]
    )
  }

  static deleteCompletedTodos = async ({ user }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await dbConnection.query(
      'DELETE FROM todos WHERE BIN_TO_UUID(`user`) = ? AND completed = 1;',
      [user]
    )
  }

  static updateTodosOrder = async ({ user, todosOrder = [] }) => {
    const [users] = await dbConnection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    todosOrder.forEach(async (todo) => {
      await dbConnection.query(
        'UPDATE todos SET `order` = ? WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [todo.order, todo.id, user]
      )
    })
  }
}
