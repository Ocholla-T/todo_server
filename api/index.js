import express from 'express'
// helper functions
import { createTodo } from '../services/createTodo.js'
import { updateTodo } from '../services/updateTodo.js'
import { findAllTodos } from '../services/findAllTodos.js'
import { deleteOneTodo } from '../services/deleteOneTodo.js'
import { deleteAllTodos } from '../services/deleteAllTodos.js'

const router = express.Router()

/**
 * route to get all todos in the database
 */
router.get('/', async (req, res) => {
  await findAllTodos().then((todos) => res.status(200).json(todos))
})

/**
 * route to create a todo
 */
router.post('/', async (req, res) => {
  try {
    const { content, isActive } = req.body

    const todoID = await createTodo({ content, isActive })
    res.status(201).json(todoID)
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
})

/**
 * route to update the content of a single todo
 */

router.patch('/:id', async (req, res) => {
  let { content } = req.body

  await updateTodo({ _id: req.params.id, content: content, isActive: true })
    .then((todo) => {
      if (res.statusCode == 200 && todo == null) {
        res.status(404).json({
          message: 'Todo not found',
        })
      }
      res.status(200).json(todo)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      })
    })
})

/**
 * route to delete all todos in the database
 */
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

/**
 * route to delete a single todo
 */

router.delete('/:id', async (req, res) => {
  try {
    await deleteOneTodo({ _id: req.params.id }).then((deletedCount) => {
      if (res.statusCode == 200 && deletedCount == 0) {
        res.status(404).json({
          message: 'Document not found',
        })
      }
      res.status(200).json({
        deleteCount: deletedCount,
      })
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
})

export default router
