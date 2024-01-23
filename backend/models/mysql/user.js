import { dbConnection } from './db-config.js'
import crypto from 'crypto'

export class UserModel {
  static createUser = async () => {
    const userId = crypto.randomUUID()
    await dbConnection.query(
      `INSERT INTO users VALUES (UUID_TO_BIN('${userId}'))`
    )
    return userId
  }
}
