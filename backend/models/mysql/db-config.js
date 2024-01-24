import mysql from 'mysql2/promise'
const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}
const dbConfig = process.env.DATABASE_URL ?? DEFAULT_CONFIG
export const dbConnection = await mysql.createConnection(dbConfig)
