import { createRequire } from 'module'
import crypto from 'crypto'
const require = createRequire(import.meta.url)
const todosData = require('./db.json')

const users = todosData.users

export class UserModel {
  static createUser = async () => {
    const newUser = {
      user_id: crypto.randomUUID(),
    }
    users.push(newUser)
    return newUser.user_id
  }
}
