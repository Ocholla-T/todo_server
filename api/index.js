import express from 'express'
// helper functions
import { createTodo } from '../services/createTodo.js'
import { findAllTodos } from '../services/findTodos.js'
import { deleteAllTodos } from '../services/deleteAllTodos.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { content, isActive } = req.body

    const { todoID } = await createTodo({ content, isActive })
    res.json({ todoID })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
})

router.delete('/', async (req, res) => {
  deleteAllTodos()
    .then((response) =>
      res.status(200).json({
        message: 'All todos have been deleted successfully',
        deletedCount: response,
      }),
    )
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      })
    })
})
export default router
