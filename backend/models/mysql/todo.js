import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'todos_app',
}

const connection = await mysql.createConnection(config)

export class TodoModel {
  static getAllTodos = async ({ user }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      return []
    }
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static createTodo = async ({ user, title }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const [newOrder] = await connection.query(
      'SELECT MAX(`order`) AS o FROM todos WHERE BIN_TO_UUID(user) = ? LIMIT 1',
      [user]
    )
    await connection.query(
      'INSERT INTO todos (title, `order`, `user`) VALUES (?, ?, UUID_TO_BIN(?));',
      [title, newOrder[0].o + 1, user]
    )
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static updateTodo = async ({ user, id, body }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    if (body.title) {
      await connection.query(
        'UPDATE todos SET title = ? WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [body.title, id, user]
      )
    } else {
      await connection.query(
        'UPDATE todos SET completed = !completed WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [id, user]
      )
    }
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static deleteTodo = async ({ user, id }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await connection.query(
      'DELETE FROM todos WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
      [id, user]
    )
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static deleteCompletedTodos = async ({ user }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await connection.query(
      'DELETE FROM todos WHERE BIN_TO_UUID(`user`) = ? AND completed = 1;',
      [user]
    )
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }

  static updateTodosOrder = async ({ user, todosOrder = [] }) => {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(user_id) `user` FROM users WHERE BIN_TO_UUID(user_id) = ?;',
      [user]
    )
    if (users.length === 0) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    todosOrder.forEach(async (todo) => {
      await connection.query(
        'UPDATE todos SET `order` = ? WHERE BIN_TO_UUID(todo_id) = ? AND BIN_TO_UUID(`user`) = ?;',
        [todo.order, todo.id, user]
      )
    })
    const [todos] = await connection.query(
      'SELECT BIN_TO_UUID(todo_id) id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos WHERE BIN_TO_UUID(`user`) = ? ORDER BY `order`;',
      [user]
    )
    return todos
  }
}
