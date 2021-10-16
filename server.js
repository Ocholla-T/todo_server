import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './api/index.js'

dotenv.config({ path: './config/.env' })
const app = express()

// connection to database
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DB_CONNECTION_URL, () => console.log('connected to database'))
}

// global middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// routing for the app
app.use('/api/todo', routes)

export default app
