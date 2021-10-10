// @ts-nocheck
import db from './database.js'
import { createTodo } from '../services/createTodo.js'
import { deleteAllTodos } from '../services/deleteAllTodos.js'

beforeAll(() => db.connect())
afterEach(() => db.clearDatabase())
afterAll(() => db.closeDatabase())

describe('Deleting all todos in the database', () => {
  test('should delete all todos', async () => {
    /**
     * create two todos in order to delete them
     */
    await createTodo({ content: 'first testTodo', isActive: true })
    await createTodo({ content: 'second testTodo', isActive: false })
    /**
     * delete the todos, the deleteAllTodos function returns deletedCount
     */
    await expect(deleteAllTodos()).resolves.toBe(2)
  })
})
